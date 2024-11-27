// Sort by popularity
// Calculate popularity and sort events
const calculatePopularity = (event) =>
  (event.registrations.current / event.registrations.limit) * 100;

const sortEventsByPopularity = (eventsList) =>
  [...eventsList].sort(
    (a, b) => calculatePopularity(b) - calculatePopularity(a)
  );
export default sortEventsByPopularity;
