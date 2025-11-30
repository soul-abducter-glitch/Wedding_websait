export type ContactFormData = {
  name: string
  email: string
  phone: string
  date: string
  location: string
  message: string
  preferredContact: string
}

export type ReviewFormData = {
  names: string
  location: string
  text: string
  contact?: string
}

export async function submitContactForm(data: ContactFormData) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:4000/api/v1"

  // Align payload with backend ContactDto requirements
  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    weddingDate: data.date.trim() || undefined,
    location: data.location.trim(),
    message: data.message.trim(),
    source: data.preferredContact || "contact_form",
  }

  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Failed to send contact form")
  }

  return res.json()
}

export async function submitReview(data: ReviewFormData) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:4000/api/v1"

  const res = await fetch(`${API_BASE}/reviews/public`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      names: data.names,
      location: data.location,
      text: data.text,
      contact: data.contact?.trim() || undefined,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Failed to send review")
  }

  return res.json()
}
