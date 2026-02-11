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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the validation schema
const challengeFormSchema = z.object({
  title: z.string().min(1, "Challenge title is required"),
  about: z.string().min(1, "About challenge is required"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  points: z.coerce.number().min(0, "Points must be 0 or greater"),
  duration: z.string().min(1, "Duration is required"),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

interface AddChallengeFormProps {
  onSubmit?: (data: ChallengeFormValues) => void;
  onCancel?: () => void;
}

export function AddChallengeForm({
  onSubmit,
  onCancel,
}: AddChallengeFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema as any),
    defaultValues: {
      title: "",
      about: "",
      requirements: "",
      benefits: "",
      points: 0,
      duration: "",
    },
  });

  async function handleSubmit(data: ChallengeFormValues) {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="container mx-auto border mt-6 border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-[#276dab] px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Add New Challenge</h2>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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
                      placeholder="Enter course title"
                      {...field}
                      className="bg-gray-100 border-gray-300 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* About Challenge */}
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    About Challenge <span className="text-red-500">*</span>
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

            {/* Requirements */}
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
                      placeholder="Describe the spiritual and practical benefits"
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
                        placeholder="0"
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
                      Duration <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 30 days, 2 weeks"
                        {...field}
                        className="bg-gray-100 border-gray-300 placeholder:text-gray-500"
                      />
                    </FormControl>
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
                {isLoading ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
