export default function formatDate(s: string) {
  const d = new Date(s);
  if (isNaN(+d)) return s;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
