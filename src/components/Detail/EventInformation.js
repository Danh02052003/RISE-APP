import React, { useEffect, useState } from "react";
import locationIcon from "../../Assets/images/components/icons/location.svg";

// Import utility functions
import formatPrice from "../../utils/Format/FormatePrice";
import formatDate from "../../utils/Format/FormateDate";
import fetchDetails from "../../utils/FetchDetails";
import ChallengeCategories from "../Card/ChallengesCategories";
import ChallengeStatus from "../Card/ChallengesStatus";
import formatTimeRange from "./../../utils/Format/FormatTimeRange";
//import third-party
//import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import { Icon } from "leaflet";

const EventInformation = ({ event }) => {
  const [organizer, setOrganizer] = useState(null);
  const [location, setLocation] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [error, setError] = useState(null);
  const { weekday, month, day } = formatDate(event.schedule.date, "long");

  // const latitude = location?.coordinates.latitude;
  // console.log(latitude);
  // const longitude = location?.coordinates.longitude;

  const { title, status, images, schedule, categories = [] } = event || {};
  const { date } = schedule || {};
  const formattedDate = `${weekday}, ${month} ${day}`;

  // Helper function to format date and time
  const formatEventDate = (date) => {
    if (!date) return "Date: Not Available";

    console.log("date", formattedDate);
    const startTime = event.schedule.startTime;
    const endTime = event.schedule.endTime;
    const formattedTime = formatTimeRange(startTime, endTime);

    return `${formattedDate} • ${formattedTime}`;
  };

  useEffect(() => {
    fetchDetails(
      event.organizer,
      event.location.address,
      event.pricing,
      setOrganizer,
      setLocation,
      setPricing,
      setError
    );
  }, [event]);

  if (error) {
    return (
      <div className="error">Error fetching additional details: {error}</div>
    );
  }

  return (
    <div className="event-information ml-[30px]">
      <div className="w-full h-[480px] top-[112px] left-[208px] rounded-[24px]">
        <img
          src={`${process.env.PUBLIC_URL}/images/Events/${images[0][0]}`}
          alt={event.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="challenge-status gap-2 flex mt-[40px]">
        <ChallengeStatus status={status} size="large" />
        <ChallengeCategories categories={categories} size="large" />
      </div>

      {/* Event Title */}
      <h1 className="w-[704px] h-[106px] font-bold text-[40px] mt-[16px]">
        {title || "No Title Provided"}
      </h1>

      <p className="w-[704px] h-[106px] font-normal text-[#6E6E6E] mt-[16px]">
        {event.description}
      </p>
      {/* Event Date and Status */}
      <div className="">
        <p className="font-semibold text-[24px]">Date and Time</p>
        <p className="text-[18px] font-normal">{formatEventDate(date)}</p>
      </div>

      {/* Event Location */}
      <div className="location">
        <h2 className="text-lg font-semibold">Location</h2>
        <div className="flex gap-[12px]">
          <img src={locationIcon} alt="search" className="w-6 h-6" />
          <div className="">
            <p className="text-[18px] font-semibold mb-[12px]">
              {location?.name}
            </p>
            {location ? (
              <p className="text-[18px] font-normal text-[#6E6E6E]">
                {location?.street}, {location?.ward} {location?.district}
              </p>
            ) : (
              "Loading details..."
            )}
            {/* Map Section */}
          </div>
        </div>
      </div>

      {/* Event Pricing */}
      <div className="pricing">
        <h2 className="text-lg font-semibold">Pricing</h2>
        <p>{pricing ? formatPrice(pricing) : "Fetching pricing details..."}</p>
      </div>

      {/* Organizer */}
      <div className="organizer">
        <h2 className="text-lg font-semibold">Organizer</h2>
        <p>{organizer ? organizer.name : "Fetching organizer details..."}</p>
      </div>

      {/* Event Images */}
      {images?.length > 0 && (
        <div className="images">
          <h2 className="text-lg font-semibold">Event Images</h2>
          {/* Add image gallery logic here if needed */}
        </div>
      )}
    </div>
  );
};

export default EventInformation;
