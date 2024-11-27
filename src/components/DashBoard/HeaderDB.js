import React from "react";
import Search from "./Search.js";
import mess from "../../Assets/icon/Dash-Board/mess.svg";
import heart from "../../Assets/icon/Dash-Board/heart.svg";
import notification from "../../Assets/icon/Dash-Board/notification.svg";

function HeaderDB() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
      <div className="w-full sm:max-w-[750px]">
        <Search />
      </div>
      {/* User actions */}
      <div className="flex gap-3 sm:gap-4 mt-4 sm:ml-4 sm:mt-0">
        <button className="flex items-center justify-center p-3 sm:p-4 gap-2 sm:gap-4 rounded-full bg-white shadow-md hover:bg-gray-100 border-none">
          <img src={mess} alt="mess" className="w-6 sm:w-8 h-6 sm:h-8" />
        </button>
        <button className="flex items-center justify-center p-3 sm:p-4 gap-2 sm:gap-4 rounded-full bg-white shadow-md hover:bg-gray-100 border-none">
          <img src={heart} alt="favor" className="w-6 sm:w-8 h-6 sm:h-8" />
        </button>
        <button className="flex items-center justify-center p-3 sm:p-4 gap-2 sm:gap-4 rounded-full bg-white shadow-md hover:bg-gray-100 border-none">
          <img
            src={notification}
            alt="notification"
            className="w-6 sm:w-8 h-6 sm:h-8"
          />
        </button>
      </div>
    </div>
  );
}

export default HeaderDB;
