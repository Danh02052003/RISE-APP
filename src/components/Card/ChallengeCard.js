// ChallengeCard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import ChallengeCategories from "./ChallengesCategories";
import ChallengeStatus from "./ChallengesStatus";
import fav from "../../Assets/icon/Dash-Board/heart.svg";

// Import styles and utilities
import "../../styles/ChallengesCard.css";
import formatPrice from "../../utils/Format/FormatePrice";
import formatDate from "../../utils/Format/FormateDate";
import fetchDetails from "../../utils/FetchDetails";

const ChallengeCard = ({ event }) => {
  const [hovered, setHovered] = useState(false);
  const [organizer, setOrganizer] = useState(null);
  const [location, setLocation] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [error, setError] = useState(null);
  const { day, month } = formatDate(event.schedule.date, "short");
  const categories = event.categories || [];
  const { title, status, images } = event;

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
  }, [event, error]);

  return (
    <Link to={`/events/${event._id}`} className="challenge-card-link">
      {" "}
      {/* Wrap with Link */}
      <div
        className="challenge-card mt-[5px] ml-[8px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="challenge-top">
          <div className="challenge-date card-in-challenge">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/Events/${hovered ? images[0][1] : images[0][0] || images[0]}`}
            alt={title || "Event image"}
            className="challenge-image"
          />
          <div className="challenge-favorite card-in-challenge">
            <img
              src={fav}
              alt="favorite challenge"
              className="favorite-challenge"
            />
          </div>
        </div>

        <div className="challenge-details ml-[16px]  mt-[16px]">
          <div className="challenge-status flex gap-2">
            <ChallengeStatus status={status} size="small" />
            <ChallengeCategories categories={categories} size="small" />
          </div>
          <div className="challenge-header h-[172px] justify-between items-center mb-[10px] ">
            <div className="challenge-title w-[328px] max-h-[50px] text-[#1C1C1C] font-bold text-[18px] mt-[8px] line-clamp-2 overflow-hidden">
              {title || "Event Title"}
            </div>
            <div className="challenge-location text-[18px] font-normal leading-[18.62px] text-left text-[#747474] mt-[8px]">
              {organizer && location ? (
                <p>
                  {organizer.name} • {location?.city}
                </p>
              ) : (
                "Loading details..."
              )}
            </div>
          </div>
          <div className="challenge-cost text-[#1C1C1C] text-[18px] font-semibold leading-[23.94px] text-left absolute bottom-[16px] mt-[8px]">
            FROM {formatPrice(pricing?.basePrice)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
