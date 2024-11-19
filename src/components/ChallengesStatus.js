import React from 'react';

const ChallengeStatus = ({ status }) => {
  // Define the class based on status
  const getStatusClass = () => {
    switch (status) {
      case "Almost Full":
        return "status almost-full";
      case "Just Added":
        return "status just-added";
      case "Sale and Soon":
        return "status sale-soon";
      default:
        return "status";
    }
  };

  return (
    <div className="challenge-status">
      <span className={getStatusClass()}>
        {status}
      </span>
    </div>
  );
};

export default ChallengeStatus;
