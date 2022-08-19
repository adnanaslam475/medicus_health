/* eslint-disable react/no-unknown-property */
interface props {
  className?: string | undefined;
}

export function PhysicianIcon({ className }: props) {
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
          id="medical-equipment"
          d="M19,8a2.993,2.993,0,0,0-1,5.816V15.5a4.5,4.5,0,0,1-9,0V14.48l3.124-2.5A4.976,4.976,0,0,0,14,8.078V3a1,1,0,0,0-1-1H11a1,1,0,0,0,0,2h1V8.078a2.986,2.986,0,0,1-1.125,2.343L8,12.719l-2.874-2.3A2.985,2.985,0,0,1,4,8.078V4H5A1,1,0,0,0,5,2H3A1,1,0,0,0,2,3V8.078a4.975,4.975,0,0,0,1.876,3.9L7,14.48V15.5a6.5,6.5,0,0,0,13,0V13.816A2.993,2.993,0,0,0,19,8Zm0,4a1,1,0,1,1,1-1,1,1,0,0,1-1,1Z"
          transform="translate(-2 -2)"
          fill="#8f95a7"
        />
      </g>
    </svg>
  );
}
