import React from "react";
interface props {
  className?: string | undefined;
}

export function MessageIcon({ className }: props) {
  return (
    <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#9e5df9" />
        <stop offset="0.772" stop-color="#1883ff" />
        <stop offset="1" stop-color="#36e1b3" />
      </linearGradient>
    </defs>
    <g>
    <path
        fill="#8f95a7"
        d="M17.3 2H4.7A2.7 2.7 0 002 4.7v9a2.7 2.7 0 002.7 2.7h10.431l3.33 3.339A.9.9 0 0019.1 20a.756.756 0 00.342-.072A.9.9 0 0020 19.1V4.7A2.7 2.7 0 0017.3 2zm.9 14.931l-2.061-2.07a.9.9 0 00-.639-.261H4.7a.9.9 0 01-.9-.9v-9a.9.9 0 01.9-.9h12.6a.9.9 0 01.9.9z"
        transform="translate(-2 -2)"
      ></path>
    </g>
  </svg>
  );
}
