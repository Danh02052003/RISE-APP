import React from "react";
const OrganizerCard = ({ organizer }) => {
  return (
    <div>
      <div className="w-[264px] h-[440px] pt-[24px] pr-[30px] pb-[24px] pl-[30px] bg-white rounded-[244px] shadow-md">
        {/* Organizer Logo */}
        <img
          src={`${process.env.PUBLIC_URL}/images/organizer/${organizer.logo}`}
          alt={organizer.name}
          className="w-[204px] h-[204px] object-cover mb-[12px] rounded-full"
        />
        <div className="flex flex-col justify-center items-center">
          {/* Organizer Name */}
          <h3 className="text-[24px] font-semibold text-[#000] mb-[8px]">
            {organizer.name}
          </h3>
          {/* Followers */}
          <p className="text-[18px] text-[#8E8E8E] mb-[8px]">
            Followers: {organizer.followers}
          </p>
          <button className="w-[154px] h-[59px] px-[32px] py-[16px] gap-[10px] rounded-full bg-[#FF7D33] text-[20px] text-[#FBFBFD] font-semibold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
