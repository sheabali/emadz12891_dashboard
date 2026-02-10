/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/src/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation() as any;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        const token = res.data.token;
        setCookie(token);

        const user = jwtDecode<CustomJwtPayload>(token);
        dispatch(setUser({ token, user }));

        toast.success(res.message || "Login successful!");

        router.push(user?.role === "ADMIN" ? "/admin/dashboard" : "/");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      {/* Background Image (FULL IMAGE – NO CUT) */}
      <div
        className="absolute inset-0 bg-center"
        style={{
          backgroundImage: "url('/Login3.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div>
        <Image
          className="absolute -top-36 -left-36 -rotate-45 w-80 h-80 object-cover opacity-20"
          src="/Ellipse_12.png"
          width={500}
          height={500}
          alt="Background Image"
        />
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-[#3580b2] p-6 shadow-2xl">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="BPC Logo"
              width={200}
              height={50}
              className="mx-auto mb-4 rounded-2xl"
              priority
            />
          </Link>

          <h1 className="text-center text-3xl text-white font-semibold">
            Admin Panel
          </h1>
          <p className="mb-6 mt-3 text-center text-md text-gray-100">
            Sign in to manage your platform
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 mt-6 font-semibold"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
