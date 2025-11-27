"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitReview, type ReviewFormData } from "@/lib/forms"
import { cn } from "@/lib/utils"

const schema = z.object({
  names: z.string().min(2, "Введите имена"),
  location: z.string().min(2, "Укажите локацию"),
  text: z.string().min(10, "Текст слишком короткий").max(2000, "Текст слишком длинный"),
  contact: z.string().optional(),
})

type Status = "idle" | "submitting" | "success" | "error"

export function ReviewForm() {
  const t = useTranslations("reviewsPage")
  const router = useRouter()
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(schema),
    defaultValues: { names: "", location: "", text: "", contact: "" },
  })
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (values: ReviewFormData) => {
    setStatus("submitting")
    try {
      await submitReview(values)
      setStatus("success")
      form.reset()
      router.refresh()
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  const fieldClass =
    "w-full rounded-sm border border-gray-300 bg-white px-3 py-3 text-sm text-text-main placeholder:text-text-muted focus:border-text-main focus:ring-1 focus:ring-text-main outline-none transition"

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-main">{t("form.names")}</label>
          <input
            className={fieldClass}
            placeholder={t("form.namesPlaceholder")}
            {...form.register("names")}
          />
          {form.formState.errors.names && (
            <p className="text-xs text-red-700">{form.formState.errors.names.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-main">{t("form.location")}</label>
          <input
            className={fieldClass}
            placeholder={t("form.locationPlaceholder")}
            {...form.register("location")}
          />
          {form.formState.errors.location && (
            <p className="text-xs text-red-700">{form.formState.errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-main">{t("form.text")}</label>
        <textarea
          rows={4}
          className={fieldClass}
          placeholder={t("form.textPlaceholder")}
          {...form.register("text")}
        />
        {form.formState.errors.text && (
          <p className="text-xs text-red-700">{form.formState.errors.text.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-main">{t("form.contact")}</label>
        <input
          className={fieldClass}
          placeholder={t("form.contactPlaceholder")}
          {...form.register("contact")}
        />
        <p className="text-xs text-text-muted">{t("form.contactHint")}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-text-main text-white px-6 py-3 text-sm tracking-wide transition-colors hover:bg-text-muted disabled:opacity-70",
          )}
        >
          {status === "submitting" ? t("form.sending") : t("form.cta")}
        </button>
        {status === "success" && <p className="text-sm text-green-700">{t("form.success")}</p>}
        {status === "error" && <p className="text-sm text-red-700">{t("form.error")}</p>}
      </div>
    </form>
  )
}
