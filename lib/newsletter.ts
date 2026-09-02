/**
 * Server-side newsletter status. The form tells readers up front whether a
 * provider is connected, so nobody types an address into a form that discards it
 * without knowing.
 */
export function newsletterConfigured() {
  return Boolean(process.env.NEWSLETTER_WEBHOOK_URL?.trim());
}
