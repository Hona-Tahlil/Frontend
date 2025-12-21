export function ageYearsMonths(isoBirthDate: string | null): string | null {
  if (isoBirthDate == null) return null;
  const birth = new Date(isoBirthDate);
  const now = new Date();

  if (Number.isNaN(birth.getTime())) return "تاریخ نامعتبر";
  if (birth > now) return "0 سال و 0 ماه";

  let totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (now.getDate() < birth.getDate()) {
    totalMonths -= 1;
  }

  totalMonths = Math.max(0, totalMonths);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0 && months !== 0) return `${months} ماه`;
  else if (months === 0 && years !== 0) return `${years} سال`;
  else if (years === 0 && months === 0) return "سن و وضعیت بلوغ وارد نشده";
  return `${years} سال و ${months} ماه`;
}
