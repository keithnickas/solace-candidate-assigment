/**
 * Formats a US phone number string into the format "XXX-XXX-XXXX".
 * @param phoneNumber - The phone number to format. Can contain non-digit characters.
 * @returns The formatted phone number as "XXX-XXX-XXXX", or `null` if the input is invalid or empty.
 */
export function formatAdvocatePhoneNumber(phoneNumber: string): string | null {
  if (!phoneNumber) return null;
  const sanitized = ("" + phoneNumber).replace(/\D/g, "");
  const match = sanitized.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}
