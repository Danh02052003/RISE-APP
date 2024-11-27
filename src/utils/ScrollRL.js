// Handle scroll when clicking the arrow buttons
const scroll = (direction, scrollContainerRef, scrollNumber) => {
  if (scrollContainerRef.current) {
    const scrollAmount = scrollNumber;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};

export default scroll;
