const fetchOrganizer = async (setOrganizer, setError, setLoading) => {
  try {
    setLoading(true); // Set loading to true before starting the fetch
    const response = await fetch("http://localhost:3000/api/organizer");
    if (!response.ok) throw new Error("Failed to fetch organizer data");

    const data = await response.json();
    if (Array.isArray(data.organizers)) {
      setOrganizer(data.organizers); // Update organizers state with the fetched data
    } else {
      throw new Error("Expected an array of organizers");
    }
  } catch (error) {
    setError(`Error fetching organizer: ${error.message}`); // Set error state if something goes wrong
  } finally {
    setLoading(false); // Always set loading to false after fetch
  }
};

export default fetchOrganizer;
