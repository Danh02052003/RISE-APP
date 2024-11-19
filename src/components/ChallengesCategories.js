import React from 'react';

const ChallengeCategories = ({ categories }) => {

  return (
    <div className="challenge-categories">
      {categories.map((event, index) => (
        <span
          key={index}
          className="category status"
        >
          {event}
        </span>
      ))}
    </div>
  );
};

export default ChallengeCategories;
