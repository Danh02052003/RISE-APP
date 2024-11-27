import React from "react";

const ChallengeCategories = ({ categories, size }) => {
  const sizeClass =
    size === "large"
      ? "text-[18px] py-[12px] px-[16px] font-semibold"
      : size === "small"
        ? "text-[12px] py-[2px] px-[10px] font-semibold"
        : "text-sm py-2 px-4";

  return (
    <div className="challenge-categories flex flex-wrap gap-2">
      {categories.map((event, index) => (
        <span
          key={index}
          className={`category ${sizeClass} leading-[18px] status text-[#304FC9] border-[#304FC9] border rounded-full`}
        >
          {event}
        </span>
      ))}
    </div>
  );
};

export default ChallengeCategories;
