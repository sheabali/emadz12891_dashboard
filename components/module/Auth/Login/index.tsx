"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data);
    // await login(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex w-full max-w-6xl items-center gap-28 px-4">
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#0c1421] rounded-lg min-h-[90vh]">
          <Image
            src="/bpc_logo.png"
            alt="BPC Logo"
            width={420}
            height={420}
            className="object-contain"
            priority
          />
        </div>

        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <Link href="/">
            <Image
              src="/bpc_logo.png"
              alt="BPC Logo"
              width={150}
              height={50}
              className="mx-auto mb-4 rounded-2xl"
            />
          </Link>
          <h1 className="text-center text-2xl font-semibold">Welcome Back</h1>
          <p className="mb-6 mt-3 text-center text-sm text-gray-600">
            Sign in to your Tennis Club account
          </p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <PHInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <PHInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-6 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </FormProvider>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-black hover:underline">
              Sign Up
            </Link>
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
