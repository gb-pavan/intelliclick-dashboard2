import { Role, StorageKey, Theme } from '@utils/enums';

export const getToken = () => {
  const role = localStorage.getItem(StorageKey.ROLE) || Role.STUDENT;
  const token = localStorage.getItem(`${role}${StorageKey.TOKEN}`);
  return token;
};

export function formatToLocalTime(isoDate: string): string {
  // Ensure `isoDate` is provided and valid
  if (!isoDate) {
    return "Invalid Date";
  }

  const date = new Date(isoDate); // Parse ISO date string

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date NaN";
  }

  // Extract components of the date
  const day = date.getDate(); // Day of the month (1-31)
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase(); // Abbreviated month (e.g., APR)
  const year = date.getFullYear(); // Full year (e.g., 2024)

  // Extract time components
  const hours = date.getHours(); // Hours (0-23)
  const minutes = date.getMinutes(); // Minutes (0-59)

  // Format time in 12-hour format with AM/PM
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")}${
    hours >= 12 ? "PM" : "AM"
  }`;

  // Return the custom format: "4 APR, 2024 4:45PM"
  return `${day} ${month}, ${year} ${formattedTime}`;
}


