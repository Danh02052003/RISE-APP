const fetchEvents = async (setEvents, setError, setLoading) => {
  try {
    setLoading(true); // Set loading to true before starting the fetch
    const response = await fetch("http://localhost:3000/api/events");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (Array.isArray(data.events)) {
      setEvents(data.events); // Update events state with the fetched data
    } else {
      throw new Error("Expected an array of events");
    }
  } catch (error) {
    setError(`Error fetching events: ${error.message}`); // Set error state if something goes wrong
  } finally {
    setLoading(false); // Always set loading to false after fetch
  }
};

export default fetchEvents;
