interface props {
  className?: string | undefined;
}

export function DollarIcon({ className }: props) {
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
      <path id="dollar_1_" data-name="dollar" d="M11.523,8.214H8.762a1.381,1.381,0,0,1,0-2.762h3.452a.69.69,0,0,1,.69.69.69.69,0,0,0,1.381,0,2.071,2.071,0,0,0-2.071-2.071H10.833V2.69a.69.69,0,1,0-1.381,0V4.071h-.69a2.762,2.762,0,0,0,0,5.523h2.762a1.381,1.381,0,0,1,0,2.762H8.071a.69.69,0,0,1-.69-.69.69.69,0,0,0-1.381,0,2.071,2.071,0,0,0,2.071,2.071H9.452v1.381a.69.69,0,0,0,1.381,0V13.737h.69a2.762,2.762,0,0,0,0-5.523Z" transform="translate(-6 -2)" fill="#8f95a7"/>
      </g>
    </svg>
  );
}
