import React, { useState, useEffect } from "react";
import "../styles/FilterButtons.css";
import Filter from "./Icons/Filter";

import date from "../Assets/icon/vuesax/outline/arrow-down.svg";
const FilterBar = ({ events }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCareerField, setSelectedCareerField] = useState("");
  const [selectedSkillSet, setSelectedSkillSet] = useState("");

  // Update filtered events based on selected filters
  const filterEvents = (filter, value) => {
    let updatedEvents = [...events];

    if (filter === "all") {
      updatedEvents = events;
    } else if (filter === "careerField") {
      updatedEvents = events.filter((event) => event.careerField === value);
    } else if (filter === "skillSet") {
      updatedEvents = events.filter((event) => event.skillSet === value);
    } else if (filter === "date") {
      updatedEvents = events.filter((event) => {
        const eventDate = new Date(event.schedule.date);
        const today = new Date();
        return eventDate.toDateString() === today.toDateString();
      });
    }
    const sortedEvents = updatedEvents.slice(0, 6);
    setFilteredEvents(sortedEvents);
  };

  const handleFilterChange = (filter, value) => {
    setSelectedFilter(filter);
    filterEvents(filter, value);
  };

  return (
    <div className="filter-container">
      <div className="filter-group h-[72px] w-fit justify-items-center p-[12px] mt-[44px] ml-[250px] flex bg-[rgb(248,249,250)] rounded-full items-center gap-[12px] flex-wrap">
        {/* Filter by Date */}
        <button
          className={`filter-button ${selectedFilter === "date" ? "active" : ""}`}
          onClick={() => handleFilterChange("date")}
        >
          <span>Date</span>
          <img src={date} alt="down" />
        </button>
        {/* Filter All */}
        <button
          className={`filter-button ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          <Filter size={20} className="text-white-100 hover:text-blue-500" />
          <span>All</span>
        </button>
        {/* Career Field Dropdown */}
        <select
          id="career-exploration-dropdown"
          className="filter-button"
          value={selectedCareerField}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCareerField(value);
            handleFilterChange("careerField", value);
          }}
        >
          <option value="">Select a career field</option>
          {["STEM", "Arts & Design", "Economics"].map((career, index) => (
            <option
              key={index}
              value={career.toLowerCase().replace(/\s+/g, "-")}
            >
              {career}
            </option>
          ))}
        </select>
        {/* Skill Set Dropdown */}
        <select
          id="soft-skills-dropdown"
          className="filter-button"
          value={selectedSkillSet}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedSkillSet(value);
            handleFilterChange("skillSet", value);
          }}
        >
          <option value="">Select a soft skill</option>
          {["Innovation", "Creativity"].map((skill, index) => (
            <option
              key={index}
              value={skill.toLowerCase().replace(/\s+/g, "-")}
            >
              {skill}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
