const formatDateTime = (time, type) => {
  // Convert time to 12-hour format with AM/PM
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Converts hour to 12-hour format, handles 00 as 12

  let formattedTime = "";

  if (type === "long") {
    formattedTime = `${hour12}:${minutes} ${ampm}`;
  } else {
    formattedTime = `${hour12} ${ampm}`;
  }

  return formattedTime;
};

export default formatDateTime;
