/* eslint-disable react/no-unknown-property */
import React from "react";
interface props {
  className?: string | undefined;
}

export function PatientIcon({ className }: props) {
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
          d="M8.747 1.008a4.462 4.462 0 00-4.455 4.455v2.97A4.429 4.429 0 005.983 11.9 8.365 8.365 0 00.35 19.547a.773.773 0 00.742.789h15.222a22.734 22.734 0 01-1.949-1.485H2.021a6.826 6.826 0 016.961-5.94 6.576 6.576 0 012.32.51 4.65 4.65 0 01.325-1.485c-.04-.015-.082-.021-.122-.035a4.428 4.428 0 001.7-3.469V5.463a4.462 4.462 0 00-4.458-4.455zm0 1.485a2.947 2.947 0 012.97 2.97v2.97a2.97 2.97 0 11-5.94 0v-2.97a2.947 2.947 0 012.97-2.97zm6.894 7.448a3.66 3.66 0 00-3.579 3.791 5.342 5.342 0 001.838 3.515 21.012 21.012 0 003.489 2.816l.409.27.409-.27a20.619 20.619 0 003.478-2.834 5.472 5.472 0 001.85-3.486 3.6 3.6 0 00-3.509-3.8 3.793 3.793 0 00-2.222 1.1 3.621 3.621 0 00-2.163-1.102zm0 1.485c.464 0 .932.231 1.636.928l.522.519.522-.519a2.55 2.55 0 011.705-.928 2 2 0 012.024 2.291 4.588 4.588 0 01-1.439 2.489 18.636 18.636 0 01-2.811 2.288 18.885 18.885 0 01-2.825-2.277 4.394 4.394 0 01-1.424-2.486 2.08 2.08 0 012.09-2.305z"
          data-name="user (4)"
          transform="translate(-1.949 -1.000)"
        ></path>
      </g>
    </svg>
  );
}
