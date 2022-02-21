interface props {
  className?: string | undefined;
}

export function ProfileIcon({ className }: props) {
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
        id="profile_1_"
        data-name="profile (1)"
        d="M134,2009a4,4,0,1,1,4.019-4,4.013,4.013,0,0,1-4.019,4m3.776.673a5.979,5.979,0,0,0,2.182-5.6,6.032,6.032,0,0,0-11.986.93,5.974,5.974,0,0,0,2.252,4.673,9.533,9.533,0,0,0-6.22,8.218,1.012,1.012,0,0,0,1,1.109.99.99,0,0,0,.993-.891,8.055,8.055,0,0,1,16,0,.99.99,0,0,0,.993.891,1.011,1.011,0,0,0,1-1.109,9.53,9.53,0,0,0-6.22-8.218"
        transform="translate(-123.999 -1999)"
        fill="#8f95a7"
      />
      </g>
    </svg>
  );
}
