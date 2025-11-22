"use client"

import { useState } from "react"
import { useForm, type UseFormRegisterReturn } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { submitContactForm, type ContactFormData } from "@/lib/forms"
import { cn } from "@/lib/utils"

const CONTACT_METHODS = ["telegram", "whatsapp", "call"] as const
type ContactMethod = (typeof CONTACT_METHODS)[number]

const getSchema = (messages: Record<string, string>) =>
  z.object({
    name: z.string().min(1, messages.required),
    email: z.string().email(messages.email),
    phone: z.string().min(7, messages.phone),
    date: z.string().min(3, messages.date),
    location: z.string().optional(),
    message: z.string().optional(),
    preferredContact: z.enum(CONTACT_METHODS, { required_error: messages.preferredContact }),
  })

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const t = useTranslations("contact.form")
  const validationMessages = t.raw("validation") as Record<string, string>
  const schema = getSchema(validationMessages)
  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      location: "",
      message: "",
      preferredContact: CONTACT_METHODS[0],
    },
  })

  const contactOptions = t.raw("preferredContactOptions") as { value: ContactMethod; label: string }[]
  const selectedContact = form.watch("preferredContact")

  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (values: ContactFormData) => {
    setStatus("submitting")
    try {
      await submitContactForm({
        ...values,
        date: values.date.trim(),
        phone: values.phone.replace(/\s+/g, ""),
      })
      setStatus("success")
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          label={t("fields.name")}
          registration={form.register("name")}
          error={form.formState.errors.name?.message}
          placeholder={t("placeholders.name")}
          required
        />
        <FormField
          label={t("fields.email")}
          registration={form.register("email")}
          error={form.formState.errors.email?.message}
          placeholder={t("placeholders.email")}
          required
          type="email"
        />
        <FormField
          label={t("fields.phone")}
          registration={form.register("phone")}
          error={form.formState.errors.phone?.message}
          placeholder={t("placeholders.phone")}
          required
        />
        <FormField
          label={t("fields.date")}
          registration={form.register("date")}
          error={form.formState.errors.date?.message}
          placeholder={t("placeholders.date")}
          required
        />
        <FormField
          label={t("fields.location")}
          registration={form.register("location")}
          error={form.formState.errors.location?.message}
          placeholder={t("placeholders.location")}
        />
      </div>
      <FormField
        label={t("fields.message")}
        registration={form.register("message")}
        error={form.formState.errors.message?.message}
        placeholder={t("placeholders.message")}
        textarea
      />
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-main">{t("fields.preferredContact")}</p>
        <div className="flex flex-wrap gap-2">
          {contactOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-within:ring-1 focus-within:ring-accent",
                selectedContact === option.value
                  ? "border-text-main bg-bg-alt text-text-main"
                  : "border-border-subtle text-text-muted hover:border-text-main",
              )}
            >
              <input
                type="radio"
                value={option.value}
                {...form.register("preferredContact")}
                className="h-4 w-4 accent-accent"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.preferredContact && (
          <p className="text-xs text-red-700">{form.formState.errors.preferredContact.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-text-main text-white px-6 py-3 text-sm tracking-wide transition-colors hover:bg-text-muted disabled:opacity-70"
        >
          {status === "submitting" ? t("sending") : t("cta")}
        </button>
        {status === "success" && <p className="text-sm text-green-700">{t("success")}</p>}
        {status === "error" && <p className="text-sm text-red-700">{t("error")}</p>}
      </div>
    </form>
  )
}

type FormFieldProps = {
  label: string
  registration: UseFormRegisterReturn
  placeholder?: string
  error?: string
  textarea?: boolean
  required?: boolean
  type?: string
}

function FormField({ label, registration, placeholder, error, textarea, required, type = "text" }: FormFieldProps) {
  const baseClasses =
    "w-full rounded-sm border border-gray-300 bg-white px-3 py-3 text-sm text-text-main placeholder:text-text-muted focus:border-text-main focus:ring-1 focus:ring-text-main outline-none transition"

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text-main">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea rows={4} className={baseClasses} placeholder={placeholder} {...registration} />
      ) : (
        <input type={type} className={baseClasses} placeholder={placeholder} {...registration} />
      )}
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  )
}
