"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Validation schema
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().min(1, "Lesson description is required"),
  duration: z.string().min(1, "Duration is required"),
  mediaFile: z.instanceof(FileList).optional(),
  pdfFile: z.instanceof(FileList).optional(),
});

const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  author: z.string().min(1, "Author name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

type CourseFormData = z.infer<typeof courseSchema>;

export function CourseForm() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/admin/dashboard/courses-management");
  };

  const [mediaFiles, setMediaFiles] = useState<{ [key: number]: string }>({});
  const [pdfFiles, setPdfFiles] = useState<{ [key: number]: string }>({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      lessons: [
        {
          title: "",
          description: "",
          duration: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const handleMediaUpload = (index: number, files: FileList | null) => {
    if (files && files[0]) {
      const fileName = files[0].name;
      setMediaFiles((prev) => ({ ...prev, [index]: fileName }));
    }
  };

  const handlePdfUpload = (index: number, files: FileList | null) => {
    if (files && files[0]) {
      const fileName = files[0].name;
      setPdfFiles((prev) => ({ ...prev, [index]: fileName }));
    }
  };

  const onSubmit = (data: CourseFormData) => {
    console.log("Course Data:", data);
    console.log("Media Files:", mediaFiles);
    console.log("PDF Files:", pdfFiles);
    // Handle form submission here
    alert("Course created successfully! Check console for details.");
  };

  return (
    <div className="min-h-screen bg-background p-6 mt-6 rounded">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto space-y-6"
      >
        <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Add New Course</h1>
        </div>

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

            {/* Author Name */}
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

            {/* Category */}
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

            {/* Description */}
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

        {/* Lessons Section */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-foreground">
              Lessons ({fields.length})
            </CardTitle>
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  duration: "",
                })
              }
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lesson
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {fields.map((field, index) => (
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
                      onClick={() => remove(index)}
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
                    <Label
                      htmlFor={`lessons.${index}.title`}
                      className="text-sm"
                    >
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
                    <Label
                      htmlFor={`lessons.${index}.description`}
                      className="text-sm"
                    >
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
                    <Label
                      htmlFor={`lessons.${index}.duration`}
                      className="text-sm"
                    >
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

                  {/* Media Upload */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Media Upload (Video/Audio)
                      </Label>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="video/*,audio/*"
                          {...register(`lessons.${index}.mediaFile`)}
                          onChange={(e) =>
                            handleMediaUpload(index, e.target.files)
                          }
                          className="hidden"
                          id={`media-${index}`}
                        />
                        <label
                          htmlFor={`media-${index}`}
                          className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-primary/30 rounded-lg bg-white cursor-pointer hover:border-primary transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground">
                              {mediaFiles[index]
                                ? mediaFiles[index]
                                : "Choose file"}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* PDF Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm">PDF Upload</Label>
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf"
                          {...register(`lessons.${index}.pdfFile`)}
                          onChange={(e) =>
                            handlePdfUpload(index, e.target.files)
                          }
                          className="hidden"
                          id={`pdf-${index}`}
                        />
                        <label
                          htmlFor={`pdf-${index}`}
                          className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-primary/30 rounded-lg bg-white cursor-pointer hover:border-primary transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground">
                              {pdfFiles[index] ? pdfFiles[index] : "Choose PDF"}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={handleBack}
            type="button"
            variant="outline"
            className="flex-1 border-2 py-6 border-primary text-primary hover:bg-primary/5 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="flex-1 bg-primary py-6 hover:bg-primary/90 text-primary-foreground"
          >
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
}
