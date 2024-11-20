import React from "react";

const Filter = ({ size = 20, className = "", onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      className={className}
      onClick={onClick}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#a)"
      >
        <path d="M.625 15a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0" />
        <path d="M8.124 15V3.438a2.188 2.188 0 0 0-4.297-.584l-3.07 11.15M11.875 15a3.75 3.75 0 1 0 7.499 0 3.75 3.75 0 0 0-7.499 0" />
        <path d="M11.875 15V3.438a2.187 2.187 0 0 1 4.297-.584l3.069 11.148" />
        <path d="M8.125 7.5h3.75V10h-3.75z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Filter;
