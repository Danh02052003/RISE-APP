// EventDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AsideMenu from "../components/AsideMenu.js";
import HeaderDB from "../components/DashBoard/HeaderDB.js";
import EventInformation from "../components/Detail/EventInformation.js";
const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get full weekday name (e.g., "Monday")
    const weekday = date.toLocaleString("default", { weekday: "long" });

    return { weekday };
  };

  const { weekday } = formatDate("2024-11-27T10:00:00Z");
  // Usage example
  console.log(weekday); // Output: "Wednesday"

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);
        setEvent(data); // Adjust based on your API response structure
      } catch (err) {
        setError(`Error fetching event details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div className="dashboard flex flex-col md:flex-row w-full h-full pb-[327px] pr-[64px]">
      {/* Sidebar - responsive for smaller screens */}
      <AsideMenu className="md:w-[250px] w-full" />

      <div className="main-content flex flex-col w-full px-4 md:px-8">
        <HeaderDB />

        <div className="flex flex-col gap-8">
          <EventInformation event={event} key={event.eventId} />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
