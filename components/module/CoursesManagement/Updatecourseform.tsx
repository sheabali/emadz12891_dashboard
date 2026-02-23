/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteCourseMutation,
  useDeleteFileMutation,
  useGetSingleCourseQuery,
  useMultipleFileUploaderMutation,
  useSingleFileUploaderMutation,
  useUpdateCourseMutation,
} from "@/redux/api/dashboardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().min(1, "Lesson description is required"),
  duration: z.string().min(1, "Duration is required"),
});

const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  author: z.string().min(1, "Author name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

type CourseFormData = z.infer<typeof courseSchema>;

type LessonMedia = {
  // Video
  videoFile?: File;
  videoLocalUrl?: string;
  videoFileName?: string;
  videoServerUrl?: string; // existing OR newly uploaded server URL
  videoUploading: boolean;
  videoError: boolean;

  // PDF
  pdfFile?: File;
  pdfLocalUrl?: string; // blob URL (new file picked)
  pdfFileName?: string;
  pdfServerUrl?: string; // existing OR newly uploaded server URL
  pdfUploading: boolean;
  pdfError: boolean;
};

const defaultMedia = (): LessonMedia => ({
  videoUploading: false,
  videoError: false,
  pdfUploading: false,
  pdfError: false,
});

export function UpdateCourseForm() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  // ─── RTK Query hooks ─────────────────────────────────────────────────────
  const { data: courseData, isLoading: isFetching } =
    useGetSingleCourseQuery(courseId);
  const [multipleFileUploader] = useMultipleFileUploaderMutation(); // Video → key: "file"
  const [singleFileUploader] = useSingleFileUploaderMutation(); // PDF   → key: "file"
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteSingleFile] = useDeleteCourseMutation(); // DELETE ?fileUrl=
  const [deleteMultipleFiles] = useDeleteFileMutation(); // DELETE { files: [] }

  const [lessonMedia, setLessonMedia] = useState<{
    [index: number]: LessonMedia;
  }>({});
  const [initialized, setInitialized] = useState(false);

  const videoInputRefs = useRef<{ [index: number]: HTMLInputElement | null }>(
    {},
  );
  const pdfInputRefs = useRef<{ [index: number]: HTMLInputElement | null }>({});

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      lessons: [{ title: "", description: "", duration: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  // ─── Pre-fill form when course data loads ────────────────────────────────
  useEffect(() => {
    if (!courseData || initialized) return;

    const course = courseData?.data ?? courseData;

    // Reset form fields
    reset({
      title: course.title ?? "",
      author: course.authorName ?? "",
      category: course.category ?? "",
      description: course.description ?? "",
      lessons: (course.courseLessons ?? []).map((lesson: any) => ({
        title: lesson.title ?? "",
        description: lesson.description ?? "",
        duration: lesson.duration ?? "",
      })),
    });

    // Pre-fill existing media URLs (no local preview for existing files)
    const mediaMap: { [index: number]: LessonMedia } = {};
    (course.courseLessons ?? []).forEach((lesson: any, i: number) => {
      mediaMap[i] = {
        ...defaultMedia(),
        videoServerUrl: lesson.videoUrl ?? undefined,
        videoFileName: lesson.videoUrl
          ? lesson.videoUrl.split("/").pop()
          : undefined,
        pdfServerUrl: lesson.lessonPdfUrl ?? undefined,
        pdfFileName: lesson.lessonPdfUrl
          ? lesson.lessonPdfUrl.split("/").pop()
          : undefined,
      };
    });

    setLessonMedia(mediaMap);
    setInitialized(true);
  }, [courseData, initialized, reset]);

  const getMedia = (index: number): LessonMedia =>
    lessonMedia[index] ?? defaultMedia();

  const updateMedia = (index: number, patch: Partial<LessonMedia>) =>
    setLessonMedia((prev) => ({
      ...prev,
      [index]: { ...(prev[index] ?? defaultMedia()), ...patch },
    }));

  const handleVideoChange = async (index: number, files: FileList | null) => {
    if (!files?.[0]) return;
    const file = files[0];

    const prev = getMedia(index);
    if (prev.videoLocalUrl) URL.revokeObjectURL(prev.videoLocalUrl);

    // Delete old server video if replacing
    if (prev.videoServerUrl) {
      try {
        await deleteSingleFile({ fileUrl: prev.videoServerUrl }).unwrap();
      } catch (e) {
        console.error("Failed to delete old video:", e);
      }
    }

    const localUrl = URL.createObjectURL(file);
    updateMedia(index, {
      videoFile: file,
      videoLocalUrl: localUrl,
      videoFileName: file.name,
      videoServerUrl: undefined,
      videoUploading: true,
      videoError: false,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await multipleFileUploader(formData).unwrap();
      // API returns { data: { videoUrl: "..." } }
      const serverUrl = res?.data?.videoUrl;
      updateMedia(index, { videoServerUrl: serverUrl, videoUploading: false });
    } catch (err) {
      console.error("Video upload failed:", err);
      updateMedia(index, { videoUploading: false, videoError: true });
    }

    if (videoInputRefs.current[index])
      videoInputRefs.current[index]!.value = "";
  };

  // ─── Remove video ─────────────────────────────────────────────────────────
  const handleRemoveVideo = async (index: number) => {
    const media = getMedia(index);
    if (media.videoServerUrl) {
      try {
        await deleteSingleFile({ fileUrl: media.videoServerUrl }).unwrap();
      } catch (e) {
        console.error("Failed to delete video:", e);
      }
    }
    if (media.videoLocalUrl) URL.revokeObjectURL(media.videoLocalUrl);
    updateMedia(index, {
      videoFile: undefined,
      videoLocalUrl: undefined,
      videoFileName: undefined,
      videoServerUrl: undefined,
      videoError: false,
    });
    if (videoInputRefs.current[index])
      videoInputRefs.current[index]!.value = "";
  };

  // ─── PDF upload ───────────────────────────────────────────────────────────
  const handlePdfChange = async (index: number, files: FileList | null) => {
    if (!files?.[0]) return;
    const file = files[0];

    const prev = getMedia(index);
    if (prev.pdfLocalUrl) URL.revokeObjectURL(prev.pdfLocalUrl);

    // Delete old server PDF if replacing
    if (prev.pdfServerUrl) {
      try {
        await deleteSingleFile({ fileUrl: prev.pdfServerUrl }).unwrap();
      } catch (e) {
        console.error("Failed to delete old PDF:", e);
      }
    }

    const localUrl = URL.createObjectURL(file);
    updateMedia(index, {
      pdfFile: file,
      pdfLocalUrl: localUrl,
      pdfFileName: file.name,
      pdfServerUrl: undefined,
      pdfUploading: true,
      pdfError: false,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await singleFileUploader(formData).unwrap();
      const serverUrl =
        typeof res === "string"
          ? res
          : (res?.url ?? res?.data?.url ?? res?.data ?? undefined);
      updateMedia(index, { pdfServerUrl: serverUrl, pdfUploading: false });
    } catch (err) {
      console.error("PDF upload failed:", err);
      updateMedia(index, { pdfUploading: false, pdfError: true });
    }
  };

  // ─── Remove PDF ───────────────────────────────────────────────────────────
  const handleRemovePdf = async (index: number) => {
    const media = getMedia(index);
    if (media.pdfServerUrl) {
      try {
        await deleteSingleFile({ fileUrl: media.pdfServerUrl }).unwrap();
      } catch (e) {
        console.error("Failed to delete PDF:", e);
      }
    }
    if (media.pdfLocalUrl) URL.revokeObjectURL(media.pdfLocalUrl);
    updateMedia(index, {
      pdfFile: undefined,
      pdfLocalUrl: undefined,
      pdfFileName: undefined,
      pdfServerUrl: undefined,
      pdfError: false,
    });
    if (pdfInputRefs.current[index]) pdfInputRefs.current[index]!.value = "";
  };

  // ─── Remove lesson ────────────────────────────────────────────────────────
  const handleRemoveLesson = async (index: number) => {
    const media = getMedia(index);
    const toDelete = [
      ...(media.videoServerUrl ? [media.videoServerUrl] : []),
      ...(media.pdfServerUrl ? [media.pdfServerUrl] : []),
    ];

    try {
      if (toDelete.length > 1) {
        await deleteMultipleFiles({ files: toDelete }).unwrap();
      } else if (toDelete.length === 1) {
        await deleteSingleFile({ fileUrl: toDelete[0] }).unwrap();
      }
    } catch (e) {
      console.error("Failed to delete lesson files:", e);
    }

    if (media.videoLocalUrl) URL.revokeObjectURL(media.videoLocalUrl);
    if (media.pdfLocalUrl) URL.revokeObjectURL(media.pdfLocalUrl);

    // Re-index lessonMedia after removal
    setLessonMedia((prev) => {
      const next: { [k: number]: LessonMedia } = {};
      Object.entries(prev).forEach(([k, v]) => {
        const i = Number(k);
        if (i < index) next[i] = v;
        else if (i > index) next[i - 1] = v;
      });
      return next;
    });

    remove(index);
  };

  const onSubmit = async (data: CourseFormData) => {
    const anyUploading = Object.values(lessonMedia).some(
      (m) => m.videoUploading || m.pdfUploading,
    );
    if (anyUploading) {
      alert("Please wait for all uploads to finish.");
      return;
    }

    try {
      const courseLessons = data.lessons.map((lesson, i) => {
        const media = getMedia(i);
        return {
          title: lesson.title,
          lessonNo: i + 1,
          description: lesson.description,
          duration: lesson.duration,
          ...(media.videoServerUrl ? { videoUrl: media.videoServerUrl } : {}),
          ...(media.pdfServerUrl ? { lessonPdfUrl: media.pdfServerUrl } : {}),
        };
      });

      const payload = {
        title: data.title,
        authorName: data.author,
        category: data.category,
        description: data.description,
        courseLessons,
      };

      await updateCourse({
        id: courseId,
        payload,
      }).unwrap();

      toast.success("Course updated successfully!");
      router.push("/admin/dashboard/courses-management");
    } catch (error) {
      console.error("Failed to update course:", error);
      toast.error("Failed to update course. Please try again.");
    }
  };

  const anyUploading = Object.values(lessonMedia).some(
    (m) => m.videoUploading || m.pdfUploading,
  );

  if (isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Loading course data…</p>
        </div>
      </div>
    );
  }

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background p-6 mt-6 rounded">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto space-y-6"
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Update Course</h1>
        </div>

        {/* ── Course Information ── */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg text-foreground">
              Course Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Course Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter course title"
                {...register("title")}
                className="bg-secondary/50 border-border py-6 focus:border-primary"
              />
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">
                Author Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author"
                placeholder="e.g., Shaikh Ahmed Al-Qari"
                {...register("author")}
                className="bg-secondary/50 border-border py-6 focus:border-primary"
              />
              {errors.author && (
                <p className="text-destructive text-sm">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                placeholder="e.g., Quran Studies, Islamic Knowledge"
                {...register("category")}
                className="bg-secondary/50 border-border py-6 focus:border-primary"
              />
              {errors.category && (
                <p className="text-destructive text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter course description"
                rows={8}
                {...register("description")}
                className="bg-secondary/50 border-border py-9 focus:border-primary"
              />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Lessons ── */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-foreground">
              Lessons ({fields.length})
            </CardTitle>
            <Button
              type="button"
              onClick={() =>
                append({ title: "", description: "", duration: "" })
              }
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Lesson
            </Button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {fields.map((field, index) => {
              const media = getMedia(index);
              return (
                <Card
                  key={field.id}
                  className="bg-[#9dbdd9] border-primary/30 overflow-hidden"
                >
                  <CardHeader className="bg-primary/10 flex flex-row items-center justify-between pb-4">
                    <h3 className="text-base font-semibold text-foreground">
                      Lesson {index + 1}
                    </h3>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveLesson(index)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    {/* Lesson Title */}
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Lesson Title <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="Enter lesson title"
                        {...register(`lessons.${index}.title`)}
                        className="bg-white border-primary/30 py-6 focus:border-primary"
                      />
                      {errors.lessons?.[index]?.title && (
                        <p className="text-destructive text-sm">
                          {errors.lessons[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    {/* Lesson Description */}
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        placeholder="Enter lesson description"
                        rows={3}
                        {...register(`lessons.${index}.description`)}
                        className="bg-white border-primary/30 focus:border-primary"
                      />
                      {errors.lessons?.[index]?.description && (
                        <p className="text-destructive text-sm">
                          {errors.lessons[index]?.description?.message}
                        </p>
                      )}
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Duration <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="e.g., 15 min, 1 hour"
                        {...register(`lessons.${index}.duration`)}
                        className="bg-white border-primary/30 py-6 focus:border-primary"
                      />
                      {errors.lessons?.[index]?.duration && (
                        <p className="text-destructive text-sm">
                          {errors.lessons[index]?.duration?.message}
                        </p>
                      )}
                    </div>

                    {/* ── File Uploads ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* ══ VIDEO ══ */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Video / Audio Upload
                        </Label>

                        <input
                          type="file"
                          accept="video/*,audio/*"
                          className="hidden"
                          id={`video-${index}`}
                          ref={(el) => {
                            videoInputRefs.current[index] = el;
                          }}
                          onChange={(e) =>
                            handleVideoChange(index, e.target.files)
                          }
                        />

                        {/* No video at all → drop zone */}
                        {!media.videoServerUrl && !media.videoLocalUrl && (
                          <label
                            htmlFor={`video-${index}`}
                            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-primary/40 rounded-xl bg-white cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <Upload className="w-6 h-6 text-primary mb-1" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload video
                            </span>
                          </label>
                        )}

                        {/* Existing server URL but no new local preview → show server video */}
                        {media.videoServerUrl && !media.videoLocalUrl && (
                          <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-black">
                            <video
                              src={media.videoServerUrl}
                              controls
                              className="w-full max-h-44 object-contain"
                            />
                            <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                              Current
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVideo(index)}
                              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 hover:opacity-80 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="bg-black/70 text-white text-xs px-3 py-1 truncate">
                              {media.videoFileName}
                            </div>
                          </div>
                        )}

                        {/* New local file picked → show local preview */}
                        {media.videoLocalUrl && (
                          <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-black">
                            <video
                              src={media.videoLocalUrl}
                              controls
                              className="w-full max-h-44 object-contain"
                            />
                            {media.videoUploading && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                                <span className="text-white text-xs">
                                  Uploading…
                                </span>
                              </div>
                            )}
                            {!media.videoUploading && media.videoServerUrl && (
                              <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                ✓ Uploaded
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveVideo(index)}
                              disabled={media.videoUploading}
                              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 hover:opacity-80 disabled:opacity-40 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="bg-black/70 text-white text-xs px-3 py-1 truncate">
                              {media.videoFileName}
                            </div>
                          </div>
                        )}

                        {/* Replace link */}
                        {(media.videoServerUrl || media.videoLocalUrl) &&
                          !media.videoUploading && (
                            <label
                              htmlFor={`video-${index}`}
                              className="flex items-center gap-2 text-xs text-primary cursor-pointer hover:underline w-fit"
                            >
                              <Upload className="w-3 h-3" /> Replace video
                            </label>
                          )}

                        {media.videoError && (
                          <p className="text-destructive text-xs">
                            Upload failed. Please try again.
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          PDF Upload
                        </Label>

                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          id={`pdf-${index}`}
                          ref={(el) => {
                            pdfInputRefs.current[index] = el;
                          }}
                          onChange={(e) =>
                            handlePdfChange(index, e.target.files)
                          }
                        />

                        {/* No PDF at all → drop zone */}
                        {!media.pdfServerUrl && !media.pdfLocalUrl && (
                          <label
                            htmlFor={`pdf-${index}`}
                            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-primary/40 rounded-xl bg-white cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <FileText className="w-6 h-6 text-primary mb-1" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload PDF
                            </span>
                          </label>
                        )}

                        {/* Existing PDF from server → show link card (can't iframe CDN PDFs) */}
                        {media.pdfServerUrl && !media.pdfLocalUrl && (
                          <div className="rounded-xl overflow-hidden border border-primary/20 bg-white">
                            <iframe
                              src={media.pdfServerUrl}
                              title={media.pdfFileName}
                              className="w-full h-44 border-none"
                            />
                            <div className="flex items-center justify-between bg-primary/10 px-3 py-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="text-xs text-foreground truncate max-w-[140px]">
                                  {media.pdfFileName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                  Current
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePdf(index)}
                                  className="text-destructive hover:opacity-70 transition"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* New local PDF picked → show iframe preview */}
                        {media.pdfLocalUrl && (
                          <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-white">
                            {media.pdfUploading && (
                              <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center gap-2">
                                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                <span className="text-primary text-xs">
                                  Uploading PDF…
                                </span>
                              </div>
                            )}
                            <iframe
                              src={media.pdfLocalUrl}
                              title={media.pdfFileName}
                              className="w-full h-44 border-none"
                            />
                            <div className="flex items-center justify-between bg-primary/10 px-3 py-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="text-xs text-foreground truncate max-w-[140px]">
                                  {media.pdfFileName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {!media.pdfUploading && media.pdfServerUrl && (
                                  <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    ✓ Uploaded
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemovePdf(index)}
                                  disabled={media.pdfUploading}
                                  className="text-destructive hover:opacity-70 disabled:opacity-40 transition"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replace link */}
                        {(media.pdfServerUrl || media.pdfLocalUrl) &&
                          !media.pdfUploading && (
                            <label
                              htmlFor={`pdf-${index}`}
                              className="flex items-center gap-2 text-xs text-primary cursor-pointer hover:underline w-fit"
                            >
                              <Upload className="w-3 h-3" /> Replace PDF
                            </label>
                          )}

                        {media.pdfError && (
                          <p className="text-destructive text-xs">
                            Upload failed. Please try again.
                          </p>
                        )}
                      </div>
                    </div>
                    {/* end file uploads grid */}
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>

        {/* ── Actions ── */}
        <div className="flex justify-center gap-4 pt-6">
          <Button
            type="button"
            onClick={() => router.push("/admin/dashboard/courses-management")}
            variant="outline"
            className="flex-1 border-2 py-6 border-primary text-primary hover:bg-primary/5 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isUpdating || anyUploading}
            className="flex-1 bg-primary py-6 hover:bg-primary/90 text-primary-foreground"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating…
              </span>
            ) : anyUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Waiting for
                uploads…
              </span>
            ) : (
              "Update Course"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
