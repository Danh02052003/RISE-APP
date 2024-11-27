// Helper function to check if an event is in the current week
const isInThisWeek = (eventDate) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of the current week
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  ); // Saturday of the current week
  // console.log(startOfWeek + endOfWeek);
  const event = new Date(eventDate);
  return event >= startOfWeek && event <= endOfWeek;
};
export default isInThisWeek;
