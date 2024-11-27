const formatTimeRange = (startTime, endTime) => {
  const format12Hour = (time) => {
    const [hour, minutes] = time.split(":");
    const hour12 = parseInt(hour);
    const ampm = hour12 >= 12 ? "PM" : "AM";
    const hourFormatted = hour12 % 12 || 12; // Convert 00:00 to 12
    return `${hourFormatted}:${minutes} ${ampm}`;
  };

  const startFormatted = format12Hour(startTime);
  const endFormatted = format12Hour(endTime);

  // Check if both start and end times are in the same period (AM or PM)
  const startPeriod = startFormatted.split(" ")[1]; // Get AM/PM of start time
  const endPeriod = endFormatted.split(" ")[1]; // Get AM/PM of end time

  if (startPeriod === endPeriod) {
    // Both times are in the same period (AM/PM)
    const startHour = startFormatted.split(":")[0]; // Get hour part of start time
    const endHour = endFormatted.split(":")[0]; // Get hour part of end time

    return `${startHour} - ${endHour}${startPeriod}`; // Example: "10am - 1pm"
  } else {
    // Times are in different periods (AM and PM)
    return `${startFormatted} - ${endFormatted} CST`; // Example: "10am - 11pm CST"
  }
};

export default formatTimeRange;
