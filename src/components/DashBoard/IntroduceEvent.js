import React from "react";
import TrendingCard from "../Card/TrendingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

//import utils
import useDragScroll from "../../utils/useDrag";
import scroll from "../../utils/ScrollRL";
//Còn top trending là k dựa theo hành vi user, tính theo sự kiện nào có nhiều lượt xem nhất, số lượng đăng ký nhiều nhất trong 7 ngày

import "../../styles/buttonArrow.css";
const IntroduceEvent = ({ events }) => {
  // console.log("introduce" + events);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useDragScroll();
  return (
    <div>
      <div className="w-[1128px] filtered-events grid grid-cols-1 gap-[24px] mt-[40px] ml-10 overflow-hidden">
        <div className="w-[1128px] flex justify-between items-center">
          <h3 className="font-semibold text-[32px] leading-[42.56px] justify-center text-left ">
            Top trending events in Ho Chi Minh City
          </h3>
          <div className="flex gap-[12px]">
            <button
              className="button-arrow"
              onClick={() => scroll("left", scrollContainerRef, 280)}
            >
              <ChevronLeft />
            </button>
            <button
              className="button-arrow"
              onClick={() => scroll("right", scrollContainerRef, 280)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-[24px] h-[300px] overflow-x-hidden max-w-[1128px] overflow-y-hidden"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none" /* To hide scrollbars in Firefox */,
            msOverflowStyle: "none" /* To hide scrollbars in IE/Edge */,
          }}
        >
          {events.length > 0 ? (
            events.map((events, index) => (
              <TrendingCard
                key={events.eventId}
                event={events}
                order={index + 1}
              />
            ))
          ) : (
            <div className="no-events">No events available at this time</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroduceEvent;
