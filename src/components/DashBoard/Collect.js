import React, { useState, useEffect } from "react";
import fetchOrganizer from "../../utils/Fetching/fetchOrganizer";

const Collect = ({ collect }) => {
  const [organizer, setOrganizer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (collect.organizer && collect.organizer._id) {
      fetchOrganizer(collect.organizer._id, setOrganizer, setError);
    }
  }, [collect]);

  if (error) return <p>Error: {error}</p>; // Display error message if there's an error

  // Count how many events are in the collect object
  const eventCount = collect.events ? collect.events.length : 0;

  return (
    <div className="w-fit h-fit rounded-[24px] bg-[#FBFBFD]">
      <div className="flex">
        <img
          src={`${process.env.PUBLIC_URL}/images/Collect/${collect.imageSrc}`}
          alt={collect.name}
        />
        <div className="w-fit h-fit mt-[203px] ml-[23px] py-[8px] px-[16px] absolute rounded-[12px] bg-[#FBFBFD] text-[#304FC9] text-[18px] font-semibold ">
          {eventCount} upcoming events
        </div>
      </div>
      <div className=" p-[24px] gap-[8px]">
        <h3 className="h-[64px] w-[504px] text-[24px] font-semibold line-clamp-2 overflow-hidden">
          {collect.name}
        </h3>

        <div className="flex">
          {organizer ? (
            <>
              <img
                className="w-[40px] h-[40px]"
                src={`${process.env.PUBLIC_URL}/images/organizer/${organizer.logo}`}
                alt={organizer.name}
              />
              <div className="text-[18px] text-[#8E8E8E]">{organizer.name}</div>
            </>
          ) : (
            <p>Loading organizer...</p> // Loading state while the organizer is being fetched
          )}
        </div>
        <p className="w-[504px] h-[80px] text-[18px] text-[#8E8E8E] line-clamp-3 overflow-hidden">
          {collect.description}
        </p>
      </div>
    </div>
  );
};

export default Collect;
