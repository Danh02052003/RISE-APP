import React from "react";

const DestinationCard = ({ destination }) => {
  // Access individual properties of the destination
  const { city, imageSrc } = destination;
  console.log(imageSrc);
  const backgroundImageUrl = `${process.env.PUBLIC_URL}/images/destination/${imageSrc}`;

  return (
    <div className="destination-card mt-[10px]">
      <div
        className="w-[264px] h-[360px] rounded-[24px] gap-[10px] bg-cover bg-center bg-slate-500 relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg z-[1]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div
          className="h-[360px] absolute rounded-[24px] bottom-0 left-0 w-full p-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 125, 51, 0) 30%, rgba(255, 125, 51, 0.6457) 70%, rgba(255, 125, 51, 0.9) 180%)",
          }}
        >
          <div className="text-[24px] mt-[304px] font-semibold leading-[31.92px] text-left text-[#FFFFFF] ">
            {city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
