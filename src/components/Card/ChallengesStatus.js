import React from "react";

const ChallengeStatus = ({ status, size }) => {
  const getStatusClass = () => {
    switch (status) {
      case "Almost Full":
        return "text-[#F31559] border-[#F31559] bg-[#F315591A]";
      case "Just Added":
        return "text-[#06B400] border-[#06B400] bg-[#06B4001A]";
      case "Sale and Soon":
        return "text-[#622EFF] border-[#622EFF] bg-[#622EFF1A]";
      default:
        return "";
    }
  };
  const sizeClass =
    size === "large"
      ? "text-[18px] py-[12px] px-[16px] font-semibold"
      : size === "small"
        ? "text-[12px] py-[2px] px-[10px] font-semibold "
        : "text-sm py-2 px-4";

  return (
    <div className="challenge-status">
      <span
        className={`${sizeClass} leading-[18px] rounded-full border border-solid text-left inline-block ${getStatusClass()}`}
      >
        {status}
      </span>
    </div>
  );
};

export default ChallengeStatus;
