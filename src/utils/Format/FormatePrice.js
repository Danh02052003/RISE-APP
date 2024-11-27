const formatPrice = (price, currency) => {
  if (price == null || price === 0) return "Free"; // or any default value you'd like to show

  // Format price with thousand separators
  const formattedPrice = new Intl.NumberFormat("de-DE").format(price);

  return `${formattedPrice}đ`; // Return the formatted price with the currency symbol
};

export default formatPrice;
