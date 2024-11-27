// src/api/fetchLocation.js
const fetchLocation = async (locationId, setLocation, setError) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/address/${locationId}`
    );
    if (!response.ok) throw new Error("Failed to fetch location data");
    const data = await response.json();
    setLocation(data);
  } catch (error) {
    setError(`Error fetching location: ${error.message}`);
  }
};

export default fetchLocation;
