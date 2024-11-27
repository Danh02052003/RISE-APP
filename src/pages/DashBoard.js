import React, { useEffect, useState } from "react";
import AsideMenu from "../components/AsideMenu.js";
import HeaderDB from "../components/DashBoard/HeaderDB.js";
import SlideImage from "../components/DashBoard/SlideImage.js";
import FilterBar from "../components/FilterBar.js";
import IntroduceEvent from "../components/DashBoard/IntroduceEvent.js";
import TopPickEvents from "../components/DashBoard/TopPickEvents.js";
import ThisTimeEvent from "../components/DashBoard/ThisTimeEvent.js";
import FamousOrganizer from "../components/DashBoard/FamousOrganizer.js";
import FreeEvents from "../components/DashBoard/FreeEvents.js";
import HandPickCollect from "../components/DashBoard/HandPickCollect.js";
import ExcitingDestinations from "../components/DashBoard/ExcitingDestinations.js";
//import style
import "../styles/Dash-Board.css";

//import util
import getNewestEvents from "../utils/GetNewestEvent.js";
import formatDateTime from "../utils/Format/FormatDateTime.js";
//import background
import background1 from "../Assets/icon/Dash-Board/pic-event/slide1.svg";
import background2 from "../Assets/icon/Dash-Board/pic-event/slide2.svg";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (Array.isArray(data.events)) {
          const transformedEvents = data.events.map((event, index) => ({
            ...event,
            time: formatDateTime(event.schedule.date, event.schedule.startTime),
            images_slide: event.images[0].map((img) => {
              return `${process.env.PUBLIC_URL}/images/Events/${img}`;
            }),
            backgroundImage: index % 2 === 0 ? background1 : background2,
          }));
          setEvents(transformedEvents);
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

  return (
    <div className="dashboard flex flex-col md:flex-row w-full h-full pb-[327px] pr-[64px]">
      {/* Sidebar - responsive for smaller screens */}
      <AsideMenu className="md:w-[250px] w-full" />

      <div className="main-content flex flex-col w-full px-4 md:px-8">
        <HeaderDB />
        <div className="challenge-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div>Loading events...</div>
          ) : error ? (
            <div>{error}</div>
          ) : events.length > 0 ? (
            <SlideImage event={getNewestEvents(events, 5)} />
          ) : (
            <div className="no-events text-center w-full">
              No events available at this time
            </div>
          )}
        </div>
        <div className="">
          <FilterBar events={events} />
        </div>

        <div className="flex flex-col gap-8">
          <TopPickEvents events={getNewestEvents(events, 6)} />
          <IntroduceEvent events={events} />
          <ThisTimeEvent events={events} />
          <FreeEvents events={events} />
          <FamousOrganizer />
          <HandPickCollect />
          <ExcitingDestinations />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
