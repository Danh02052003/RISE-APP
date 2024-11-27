const formatDate = (dateString, type) => {
  const date = new Date(dateString);

  // Get full weekday name (e.g., "Monday")
  const weekday = date.toLocaleString("default", { weekday: "long" });

  // Get full month name (e.g., "November")
  const month = date.toLocaleString("default", { month: type });

  // Get the day of the month (e.g., "27")
  const day = String(date.getDate()).padStart(2, "0");

  return { weekday, month, day };
};

// Usage example
export default formatDate;
