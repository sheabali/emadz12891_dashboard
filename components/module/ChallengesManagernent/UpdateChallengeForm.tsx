/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateChallengeMutation } from "@/redux/api/dashboardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const challengeFormSchema = z.object({
  title: z.string().min(1, "Challenge title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  points: z.coerce.number().min(0, "Points must be 0 or greater"),
  duration: z.coerce.number().min(1, "Duration is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  status: z.enum([
    "UPCOMING",
    "ACTIVE",
    "ONGOING",
    "DELETED",
    "COMPLETED",
    "CANCELLED",
  ]),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

interface UpdateChallengeFormProps {
  challengeId: string;
  initialData: ChallengeFormValues;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateChallengeForm({
  challengeId,
  initialData,
  onSuccess,
  onCancel,
}: UpdateChallengeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateChallenge] = useUpdateChallengeMutation();

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema as any),
    defaultValues: initialData,
  });

  // Re-populate form if initialData changes (e.g. modal reuse)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  async function handleSubmit(data: ChallengeFormValues) {
    setIsLoading(true);
    try {
      await updateChallenge({ id: challengeId, body: data }).unwrap();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset(initialData);
    if (onCancel) onCancel();
  };

  return (
    <div className="container mx-auto border mt-6 border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-[#276dab] px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Update Challenge</h2>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Challenge Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter challenge title"
                      {...field}
                      className="bg-gray-100 border-gray-300 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this challenge is about and its purpose"
                      {...field}
                      className="bg-gray-100 border-gray-300 placeholder:text-gray-500 min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Requirements <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List what participants need to complete this challenge"
                      {...field}
                      className="bg-gray-100 border-gray-300 placeholder:text-gray-500 min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Benefits */}
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Benefits <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the benefits of completing this challenge"
                      {...field}
                      className="bg-gray-100 border-gray-300 placeholder:text-gray-500 min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Points and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Points <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 500"
                        {...field}
                        className="bg-gray-100 border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Duration (days) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 30"
                        {...field}
                        className="bg-gray-100 border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Difficulty and Status */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Difficulty <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 border-gray-300">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 border-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 border-red-200 py-6 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#276dab] py-6 hover:bg-blue-800 text-white"
              >
                {isLoading ? "Updating..." : "Update Challenge"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
