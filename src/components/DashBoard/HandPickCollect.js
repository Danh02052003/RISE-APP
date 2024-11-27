import React, { useEffect, useState } from "react";
import axios from "axios";
import Collect from "./Collect";
import { ChevronLeft, ChevronRight } from "lucide-react";
//import utils
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
const Collects = () => {
  const [collects, setCollects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/collects");
        setCollects(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchCollectsData();
  }, []);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[1128px] filtered-events grid grid-cols-1 ml-[40px] gap-[24px] mt-[40px]">
      <div className="w-[1128px] flex justify-between items-center">
        {/* Title centered vertically and horizontally */}
        <h2 className="text-[32px] font-semibold text-[#000000] justify-center">
          Hand-picked Collections
        </h2>

        {/* Buttons aligned to the right */}
        <div className="flex gap-[12px]">
          <button
            className="button-arrow"
            onClick={() => scroll("left", scrollContainerRef, 560)}
          >
            <ChevronLeft />
          </button>
          <button
            className="button-arrow"
            onClick={() => scroll("right", scrollContainerRef, 560)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="organizer-cards flex gap-[24px] overflow-x-auto max-w-[1128px] overflow-y-hidden"
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
        {collects.map((collect) => (
          <Collect collect={collect} />
        ))}
      </div>
    </div>
  );
};

export default Collects;
