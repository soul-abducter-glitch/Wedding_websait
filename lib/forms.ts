export type ContactFormData = {
  name: string
  email: string
  phone: string
  date: string
  location: string
  message: string
  preferredContact: string
}


export async function submitContactForm(data: ContactFormData) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:4000/api/v1"

  const payload = {
    name: data.name,
    date: data.date,
    messenger: data.preferredContact,
    contact: data.phone || data.email,
    details: [
      data.location ? `Локация: ${data.location}` : null,
      data.message ? `Сообщение: ${data.message}` : null,
      data.email ? `Email: ${data.email}` : null,
      data.phone ? `Телефон: ${data.phone}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
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
