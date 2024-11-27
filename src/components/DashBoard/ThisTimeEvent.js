import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChallengeCard from "../Card/ChallengeCard";
import isInThisMonth from "../../utils/ThisTime/isInThisMonth";
import isInThisWeek from "../../utils/ThisTime/isInThisWeek";
import getNewestEvents from "../../utils/GetNewestEvent";
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
const ThisTimeEvent = ({ events }) => {
  const [activeTab, setActiveTab] = useState("week"); // Default active is "This week"
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Effect to filter and sort events based on the active tab
  useEffect(() => {
    let filtered = events;

    // Filter events based on active tab
    if (activeTab === "week") {
      filtered = events.filter((event) => isInThisWeek(event.schedule.date));
    } else if (activeTab === "month") {
      filtered = events.filter((event) => isInThisMonth(event.schedule.date));
    }

    // Use getNewestEvents to get the top 6 newest events
    const newestEvents = getNewestEvents(filtered, 6);
    setFilteredEvents(newestEvents);
  }, [activeTab, events]);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();

  return (
    <div>
      <div className=" mt-[40px] ml-[40px]">
        {/* Tabs */}
        <div className=" flex justify-between items-center mb-[24px] ">
          <div>
            {/* "This week" Tab */}
            <span
              className={`cursor-pointer ${
                activeTab === "week"
                  ? "text-[32px] font-semibold underline underline-offset-[4px] decoration-skip-ink-none"
                  : "text-[32px] font-normal text-[#727272]"
              }`}
              onClick={() => setActiveTab("week")}
            >
              This week
            </span>
            {/* "This month" Tab */}
            <span
              className={`ml-[40px] cursor-pointer ${
                activeTab === "month"
                  ? "text-[32px] font-semibold underline underline-offset-[4px] decoration-skip-ink-none"
                  : "text-[32px] font-normal text-[#727272]"
              }`}
              onClick={() => setActiveTab("month")}
            >
              This month
            </span>
          </div>
          {/* Arrows */}
          <div className="ml-[405px] flex gap-[12px] mb">
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
          className="h-[400px] w-[1128px] overflow-hidden flex gap-[24px] overflow-x-auto max-w-[1128px]"
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
            <div className="no-events">No events available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThisTimeEvent;
