import React, { useEffect, useState } from "react";
import axios from "axios";
import DestinationCard from "../Card/DestinationCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
const ExcitingDestinations = () => {
  const [destination, setDestination] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/address");

        // Access the 'addresses' array from the response data
        setDestination(response.data.addresses);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchDestinationData();
  }, []);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();

  console.log("dasda", destination);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="w-[1128px] filtered-events grid grid-cols-1 gap-[24px] mt-[40px] ml-10">
        <div className="w-[1128px] flex justify-between items-center">
          <h3 className="font-semibold text-[32px] leading-[42.56px] justify-center text-left ">
            Top trending events in Ho Chi Minh City
          </h3>
          <div className="mt-[10px] ml-[405px] flex gap-[12px]">
            <button
              className="button-arrow"
              onClick={() => scroll("left", scrollContainerRef, 275)}
            >
              <ChevronLeft />
            </button>
            <button
              className="button-arrow"
              onClick={() => scroll("right", scrollContainerRef, 275)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className=" flex gap-[24px] overflow-x-auto max-w-[1128px] h-[450px]"
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
          {" "}
          {Array.isArray(destination) && destination.length > 0 ? (
            destination.map((place) => (
              <DestinationCard destination={place} key={place._id} /> // Pass 'destination' as a prop
            ))
          ) : (
            <p>No destinations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcitingDestinations;
