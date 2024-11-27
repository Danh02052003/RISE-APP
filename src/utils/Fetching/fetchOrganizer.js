import axios from "axios";

// Function to fetch organizer data
const fetchOrganizer = async (organizerId, setOrganizer, setError) => {
  try {
    const response = await axios.get(`/api/organizer/${organizerId}`);
    setOrganizer(response.data);
  } catch (error) {
    setError("Failed to fetch organizer data");
  }
};

export default fetchOrganizer;
