import React, { useState } from "react";
import "../styles/FilterButtons.css";
import Filter from "./Icons/Filter";

const FilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <div className="filter-container">
      <div className="filter-group">
        <button
          className={`filter-button dropdown-button}`}
          onClick={() => setSelectedFilter("all")}
        >
          <span>Date</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon//vuesax/outline/arrow-down.svg`}
            alt="down"
          />
        </button>
        <button
          className={`filter-button ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => setSelectedFilter("all")}
        >
          <Filter
            size={20}
            className="text-white-100 hover:text-blue-500"
            onClick={() => console.log("clicked")}
          />
          <span>All</span>
        </button>
        <button className="filter-button dropdown-button">
          <Filter
            size={20}
            className="text-black-100"
            onClick={() => console.log("clicked")}
          />{" "}
          <span>All Career Fields</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon//vuesax/outline/arrow-down.svg`}
            alt="down"
          />
        </button>
        <button className="filter-button dropdown-button">
          <Filter
            size={20}
            className="text-black-100"
            onClick={() => console.log("clicked")}
          />
          <span>All Skill Sets</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon//vuesax/outline/arrow-down.svg`}
            alt="down"
          />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
