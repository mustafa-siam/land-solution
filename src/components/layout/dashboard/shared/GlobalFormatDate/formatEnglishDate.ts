export const formatEnglishDate = (dateString?: string): string => {
  if (!dateString) return "";
  
  const date = new Date(dateString);

  // If invalid date, return empty string instead of "Invalid Date"
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
