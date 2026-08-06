/**
 * One date format for the whole site: "8 July 2021". Parsed as UTC so the
 * rendered day never shifts with the server's timezone.
 */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
