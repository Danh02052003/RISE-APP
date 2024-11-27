import React, { useEffect, useState } from "react";
// Import function
import formatPrice from "../../utils/Format/FormatePrice";
import fetchDetails from "../../utils/FetchDetails";

const TrendingCard = ({ event, order }) => {
  const [, setOrganizer] = useState(null);
  const [, setLocation] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [, setError] = useState(null);

  // console.log("trending: " + event);
  // Fetch details on mount or when the event data changes
  useEffect(() => {
    if (event.organizer && event.location.address && event.pricing) {
      fetchDetails(
        event.organizer,
        event.location.address,
        event.pricing,
        setOrganizer,
        setLocation,
        setPricing,
        setError
      );
    }
  }, [event]);
  //console.log("pricing in Trending " + pricing?.basePrice);
  // Construct the image URL from the event object
  const backgroundImageUrl = `${process.env.PUBLIC_URL}/images/Events/${event.images[0][0]}`;

  return (
    <div className="mt-[10px] flex gap-0 relative z-0">
      <div
        className="w-[44px] number-text font-semibold text-[160px] z-[0] transform translate-y-[70px] translate-x-[0px]"
        style={{ color: "rgba(0, 0, 0, 0.1)" }}
      >
        {order} {/* Hiển thị số thứ tự */}
      </div>
      <div
        className="w-[200px] h-[260px] rounded-[24px] gap-[10px] bg-cover bg-center bg-slate-500 relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg z-[1]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute rounded-[24px] bottom-0 left-0 w-full bg-gradient-to-t from-[#304fc9] to-[rgba(48, 79, 201, 0)] p-4">
          <div className="text-[20px] font-semibold leading-[31.92px] text-left text-[#fbfbfd] line-clamp-2">
            {event.title}
          </div>
          <div className="text-[18px] font-normal leading-[23.94px] text-left text-[#fbfbfd] mt-[8px]">
            FROM {formatPrice(pricing?.basePrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
