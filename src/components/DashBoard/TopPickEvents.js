import React from "react";
import ChallengeCard from "../Card/ChallengeCard";

// Top our picks là sẽ được tính dựa trên hành vi của người dùng,
// họ hay xem và các sự kiện nào tương tự trước đây, thể loại mà họ quan tâm, đề xuất những sự kiện phổ biến trong nhóm đó
// (thống kê bằng lượt click, thời gian xem với tỷ lệ chuyển đổi)
const TopPickEvents = ({ events }) => {
  return (
    <div className="w-full max-w-screen-xl ml-10 px-4 sm:px-6">
      {/* Top pick filtered events */}
      <h3 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-left mt-8">
        Our top picks for you
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.length > 0 ? (
          events.map((event) => (
            <ChallengeCard event={event} key={event.eventId} />
          ))
        ) : (
          <div className="no-events text-center col-span-full">
            No events available
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPickEvents;
