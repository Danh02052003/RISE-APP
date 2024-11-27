import React, { useEffect, useState } from "react";
import OrganizerCard from "../Card/OrganizerCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Import utils
import fetchOrganizer from "../../utils/fetchingOrganizer";
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
//import css
import "../../styles/Organizer.css";
const FamousOrganizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();

  useEffect(() => {
    fetchOrganizer(setOrganizers, setLoading, setError);
  }, [loading]);

  return (
    <div className="organizer-list ml-[40px]">
      <div className="w-[1128px] flex justify-between items-center mb-[24px]">
        <h2 className="text-[32px] font-semibold text-[#000000] justify-center">
          Organizer to follow
        </h2>

        <div className="flex gap-[12px]">
          <button
            className="button-arrow"
            onClick={() => scroll("left", scrollContainerRef, 290)}
          >
            <ChevronLeft />
          </button>
          <button
            className="button-arrow"
            onClick={() => scroll("right", scrollContainerRef, 290)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="organizer-cards flex gap-[24px] overflow-x-auto max-w-[1128px] h-[450px]"
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
        {organizers.length > 0 ? (
          organizers.map((organizer) => (
            <OrganizerCard key={organizer._id} organizer={organizer} />
          ))
        ) : (
          <div>No organizers available</div>
        )}
      </div>
    </div>
  );
};

export default FamousOrganizer;
