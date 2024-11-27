// PopularChallenges.js
import React, { useEffect, useState } from "react";
import ChallengeCard from "../Card/ChallengeCard";
import { Link } from "react-router-dom";
import "../../styles/PopularChallenges.css";
// import function
import getNewestEvents from "../../utils/GetNewestEvent";
//import img
import popularChallenge from "../../Assets/images/popularchallenge.svg";
import instagram from "../../Assets/icon/instagram.svg";

const PopularChallenges = () => {
  const [events, setEvents] = useState([]);
  const [activitiesState, setActivitiesState] = useState({
    activities: [],
    loading: true,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          throw new Error("Expected an array of events");
        }
      } catch (error) {
        setError(`Error fetching events: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/activities");
        if (!res.ok) throw new Error("Failed to fetch activities");

        const data = await res.json();
        setActivitiesState({
          activities: Array.isArray(data) ? data : [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivitiesState({
          activities: [],
          loading: false,
          error: "Failed to fetch activities. Please try again later.",
        });
      }
    };
    fetchActivities();
  }, [error]);

  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = activitiesState;

  return (
    <div className="popular-challenges w-full m-auto flex flex-col items-center justify-center bg-[#EDEEF6] overflow-hidden">
      <img
        className="text-star mt-[244px]"
        src={popularChallenge}
        alt="Popular Challenges"
      />

      <div className="challenge-grid grid grid-cols-3 gap-[24px] m-0">
        {loading ? (
          <div>Loading events...</div>
        ) : getNewestEvents(events, 6).length > 0 ? (
          getNewestEvents(events, 6).map((event) => (
            <ChallengeCard key={event._id} event={event} /> // Add key prop
          ))
        ) : (
          <div className="no-events">No events available at this time</div>
        )}
      </div>

      <Link to="/dash-board">
        <button className="see-all-button">See all &#8594;</button>
      </Link>
      <div className="activities">
        <h2 className="mb-[20px] w-auto m-0 mt-[354px] leading-[1.1] text-[#333] text-[100px] font-normal text-center">
          FUN ACTIVITIES <br /> WITH US.
        </h2>

        {activitiesLoading && <p>Loading activities...</p>}
        {activitiesError && <p className="error">{activitiesError}</p>}

        <div className="activity-grid grid gap-[20px] max-w-[1200px] m-auto">
          {activities.map((activity, index) => (
            <img
              key={activity._id} // Ensure unique key
              src={`${process.env.PUBLIC_URL}${activity.src}`}
              alt={activity.alt}
              className={`activity-image ${
                ["top-left", "top-right", "bottom-left", "bottom-right"][
                  index % 4
                ]
              }`} // Use modulo for class assignment
            />
          ))}
        </div>

        <div className="instagram-icon">
          <img src={instagram} alt="Instagram" />
        </div>
      </div>
    </div>
  );
};

export default PopularChallenges;
