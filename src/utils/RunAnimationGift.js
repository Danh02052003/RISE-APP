const startGifTransition = (setActiveIndex) => {
  console.log("Starting GIF transitions...");
  const timeouts = [];
  const showGifs = () => {
    timeouts.push(
      setTimeout(() => {
        console.log("Transitioning to three-step");
        setActiveIndex(0);
      }, 0)
    );

    // Transition for gif-coin
    timeouts.push(
      setTimeout(() => {
        console.log("Transitioning to gif-coin");
        setActiveIndex(1);
      }, 2000)
    ); // Move to gif-coin after 2 seconds

    // Transition for gif-run
    timeouts.push(
      setTimeout(() => {
        console.log("Transitioning to gif-run");
        setActiveIndex(2);
      }, 4000)
    ); // Move to gif-run after 4 seconds

    // Transition for gif-gift
    timeouts.push(
      setTimeout(() => {
        console.log("Transitioning to gif-gift");
        setActiveIndex(3);
      }, 6000)
    ); // Move to gif-gift after 6 seconds

    // Transition for the-best
    timeouts.push(
      setTimeout(() => {
        console.log("Transitioning to the-best");
        setActiveIndex(4);
      }, 8000)
    ); // Move to the-best after 8 seconds
  };

  showGifs(); // Initialize the GIF display

  return () => {
    timeouts.forEach((timeout) => clearTimeout(timeout)); // Cleanup on unmount
  };
};

export default startGifTransition;
