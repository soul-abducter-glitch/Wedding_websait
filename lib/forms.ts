export type ContactFormData = {
  name: string
  email: string
  phone: string
  date: string
  location: string
  message: string
  preferredContact: string
}


/**
 * Placeholder for backend integration.
 * Expected payload: ContactFormData with ISO-formatted date, normalized phone, and free-form message.
 * Replace console.log with an API call (REST/GraphQL) and handle backend errors accordingly.
 */
export async function submitContactForm(data: ContactFormData) {
  // TODO: integrate API endpoint once backend is available.
  // This is intentionally left as a stub to keep the frontend ready for future wiring.
  console.log("Contact form submission", data)
}
