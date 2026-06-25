"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: RegisterFormValues) {
     await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
     }, {
        onSuccess: () => {
          alert('Account created successfully');
          router.replace('/login');
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error));
        }
     });
  }

  const gridOpacities = [0.9, 0.3, 0.6, 0.6, 0.3, 0.9, 0.6, 0.3, 0.3, 0.9, 0.6, 0.9, 0.3, 0.6, 0.9, 0.3, 0.3, 0.6, 0.9, 0.6, 0.9, 0.3, 0.6, 0.3, 0.9, 0.6, 0.3, 0.9, 0.6, 0.3, 0.9, 0.6, 0.3, 0.9, 0.6, 0.9, 0.3, 0.3, 0.9, 0.6]

  return (
  <div className="flex min-h-screen">
    <div className="hidden w-1/2 flex-col items-center justify-center bg-[#FCFAF7] p-12 lg:flex">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-semibold tracking-[-0.025em] leading-none text-[#423D38]">
          DuiDui Center
        </h1>
        <p className="mt-4 text-lg text-[#797067]">
          Command Center
        </p>
        <div className="mt-12 rounded-lg border border-[#E3E0DD] bg-white p-6">
          <div className="grid grid-cols-5 gap-1">
            {gridOpacities.map((opacity, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm bg-[#F3F4F6]"
                style={{ opacity }}
              />
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#797067]">
            Global Telemetry Grid
          </p>
        </div>
      </div>
    </div>

    <div className="flex w-full items-center justify-center bg-[#FE6E00] p-8 lg:w-1/2">
      <Card className="w-full max-w-sm border-0 shadow-raised">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Fill out the form below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-register-name"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-register-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-register-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-register-confirm-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="form-register" className="w-full">
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
  )
}
