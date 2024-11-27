const fetchPricing = async (pricingId, setPricing, setError) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pricing/${pricingId}`
    );
    if (!response.ok) throw new Error("Failed to fetch pricing data");

    const data = await response.json();
    setPricing(data); // Sets pricing data in state
  } catch (error) {
    setError(`Error fetching pricing: ${error.message}`);
  }
};

export default fetchPricing;
