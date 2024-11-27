import React, { useState, useEffect } from "react";
import ChallengeCard from "../Card/ChallengeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
//import utils
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
const FreeCard = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [, setPricing] = useState([]);
  const [error, setError] = useState(null);
  const [, setLoading] = useState(true);

  // Fetch organizer data when the component mounts
  useEffect(() => {
    const fetchPricingsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pricing");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPricing(data.pricing);

        // Filter the events where pricing.basePrice is 0
        const freeEvents = events.filter((event) => {
          const eventPricing = data.pricing.find(
            (p) => p._id === event.pricing
          );
          return eventPricing && eventPricing.basePrice === 0; // Ensure basePrice is 0 for free events
        });
        setFilteredEvents(freeEvents);
      } catch (error) {
        setError("Failed to fetch organizer data: " + error.message);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchPricingsData();
  }, [events]);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();

  return (
    <div className="w-[1128px] filtered-events grid grid-cols-1 ml-[40px] gap-[24px] ">
      <div className="flex justify-between items-center ">
        {/* Title aligned to the left */}
        <h2 className="text-[32px] font-semibold text-[#000000]  justify-center">
          Free
        </h2>

        {/* Buttons aligned to the right */}
        <div className="flex gap-[12px]">
          <button
            className="button-arrow"
            onClick={() => scroll("left", scrollContainerRef, 375)}
          >
            <ChevronLeft />
          </button>
          <button
            className="button-arrow"
            onClick={() => scroll("right", scrollContainerRef, 375)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {/* Event Cards */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-3 gap-[24px] overflow-x-auto max-w-[1128px] h-[450px]"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <ChallengeCard event={event} key={event.eventId} />
          ))
        ) : (
          <div className="no-events">No free events available</div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FreeCard;
