import fetchOrganizer from "./Fetching/fetchOrganizer";
import fetchLocation from "./Fetching/fetchLocation";
import fetchPricing from "./Fetching/fetchPricing";
import fetchSkills from "./Fetching/fetchSkills";
const fetchDetails = async (
  organizerId,
  locationId,
  pricingId,
  setOrganizer,
  setLocation,
  setPricing,
  setError
) => {
  await Promise.all([
    fetchOrganizer(organizerId, setOrganizer, setError),
    fetchLocation(locationId, setLocation, setError),
    fetchPricing(pricingId, setPricing, setError),
  ]);
};

export default fetchDetails;
