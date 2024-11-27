import React from "react";
// Import images
import searchIcon from "../../Assets/images/search.svg";
import locationIcon from "../../Assets/images/components/icons/location.svg";

const Search = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full p-2 mt-6 mx-4 bg-white rounded-full shadow-lg overflow-hidden border-none">
      {/* Search for activities */}
      <div className="flex items-center w-full sm:w-[420px] h-[48px] border-b sm:border-r border-none pl-2 pr-2 sm:pl-2 sm:pr-2">
        <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#EFF0F6] rounded-full mr-2">
          <img src={searchIcon} alt="search" className="w-6 h-6" />
        </div>
        <input
          type="text"
          placeholder="Search for activities, challenges"
          className="flex-1 h-full bg-transparent text-gray-800 text-base px-2 outline-none placeholder-gray-400"
        />
      </div>

      {/* Search location */}
      <div className="flex items-center relative w-full sm:w-[300px] h-[48px] pl-2 pr-2 sm:pl-2 sm:pr-2 mt-2 sm:mt-0 sm:ml-2 border-none">
        <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#EFF0F6] rounded-full mr-2 flex-shrink-0">
          <img src={locationIcon} alt="location" className="w-6 h-6" />
        </div>
        <input
          type="text"
          placeholder="Ho Chi Minh City"
          className="flex-1 h-full bg-transparent text-gray-800 text-base px-2 outline-none placeholder-gray-400"
        />
        <button className="absolute right-2 w-[48px] h-[48px] bg-[#FF7D33] rounded-full flex justify-center items-center cursor-pointer border-none">
          <img
            src={searchIcon}
            alt="search"
            className="w-6 h-6 filter brightness-0 invert"
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
