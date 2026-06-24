"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const json = await res.json()

        if (json.success) {
          form.reset()
          setIsSuccess(true)
        } else {
          toast.error(json.error || "An error occurred. Please try again.")
        }
      } catch {
        toast.error("Unable to connect to the server. Please try again later.")
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="h-16 w-16 text-[#00C758]" />
        <h3 className="text-lg font-bold">Message Sent</h3>
        <p className="text-sm text-[#797067]">
          Thank you for reaching out. We will respond shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form id="form-contact" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-contact-name">Name</FieldLabel>
              <Input
                {...field}
                id="form-contact-name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
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
              <FieldLabel htmlFor="form-contact-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-contact-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="example@email.com"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-contact-message">
                Message
              </FieldLabel>
              <Textarea
                {...field}
                id="form-contact-message"
                rows={5}
                aria-invalid={fieldState.invalid}
                placeholder="Type your message..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        form="form-contact"
        className="w-full mt-6"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
