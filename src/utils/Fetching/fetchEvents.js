const fetchEvents = async (eventIds, setEvents, setError) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/events?ids=${eventIds.join(",")}`
    );
    if (!response.ok) throw new Error("Failed to fetch events data");

    const data = await response.json();

    // Ensure that the fetched data is an array
    if (Array.isArray(data.events)) {
      setEvents(data.events); // Update state with events array
    } else {
      setEvents([]); // Set empty array if the response is not in the expected format
    }
  } catch (error) {
    console.error("Error fetching events:", error.message);
    setError(`Error fetching events: ${error.message}`);
  }
};

export default fetchEvents;
