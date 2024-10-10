import React from 'react';

const ChallengeCategories = ({ categories, typeOfEvent }) => {
  const borderColor = typeOfEvent === "Challenge Event" ? '#747474' : '#304FC9';

  return (
    <div className="challenge-categories">
      {categories.map((event, index) => (
        <span
          key={index}
          className="category"
          style={{ borderColor }}
        >
          {event}
        </span>
      ))}
    </div>
  );
};

export default ChallengeCategories;
