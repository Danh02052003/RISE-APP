// Helper function to check if an event is in the current month
const isInThisMonth = (eventDate) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
  // console.log(startOfMonth + endOfMonth);
  const event = new Date(eventDate);
  return event >= startOfMonth && event <= endOfMonth;
};

export default isInThisMonth;
