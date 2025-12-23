"use client";

import PHInput from "@/components/form/NRInput";
import PHSelect from "@/components/form/NRSelect";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    skill: z.string().min(1, "Please select your skill level"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const skillOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Advanced", label: "Advanced" },
  { value: "Pro", label: "Pro" },
];

const RegisterPage = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      skill: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Register Data:", data);
      // await registerUser(data).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl gap-20 items-center">
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#0c1421] rounded-xl min-h-[90vh]">
          <Link href="/">
            <Image
              src="/bpc_logo.png"
              alt="BPC Logo"
              width={420}
              height={420}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold">Join Our Club</h1>
          <p className="mt-2 mb-6 text-center text-sm text-gray-600">
            Create your Tennis Club membership account
          </p>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <PHInput
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
              />

              <PHInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <PHInput
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="Enter your phone number"
              />

              <PHSelect
                control={form.control}
                name="skill"
                label="Skill Level"
                options={skillOptions}
              />

              <PHInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <PHInput
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
              />

              <Button
                type="submit"
                className="w-full py-6 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </FormProvider>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
