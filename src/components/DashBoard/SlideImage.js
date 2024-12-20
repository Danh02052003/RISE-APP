import React, { useState, useEffect } from "react";
import "../../styles/SlideImage.css";

const SlideImage = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % event.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [event.length]);

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {event.map((slide, index) => (
          <div
            key={index}
            className={`slide ${slide.backgroundColor} ${index === currentSlide ? "active" : ""}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              backgroundImage: `url(${slide.backgroundImage})`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div className="content">
              <div className="text-content">
                <h1>{slide.title}</h1>
                <div className="time-badge">
                  <span class="text-[#304fc9] text-[24px] font-semibold leading-[31.92px] text-left ">
                    {slide.time}
                  </span>
                </div>
              </div>
              <div className="image-container w-[360px] ">
                {slide.images_slide &&
                  slide.images_slide.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Event ${imgIndex + 1}`}
                      className={`image-${imgIndex + 1}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="dots">
        {event.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)} // Manual navigation
          />
        ))}
      </div>
    </div>
  );
};

export default SlideImage;
