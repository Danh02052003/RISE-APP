const getNewestEvents = (events, limitEvent) => {
  if (!Array.isArray(events)) {
    console.error("Invalid events data");
    return []; // Return an empty array if events is not valid
  }

  // Sort the events by date (newest first)
  const sortedEvents = events.sort(
    (a, b) => new Date(b.schedule.date) - new Date(a.schedule.date)
  ); // Sort by date descending (newest first)

  // Limit to 'limitEvent' number of events
  return sortedEvents.slice(0, limitEvent);
};

export default getNewestEvents;
