"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PHInput
              control={form.control}
              name="email"
              label="Email"
              type="email"
            />
            <div className="mt-4">
              <PHInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />
            </div>
          </form>
          <Button
            type="submit"
            className="mt-4 w-full py-6"
            onClick={form.handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
