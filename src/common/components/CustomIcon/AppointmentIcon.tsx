interface props {
  className?: string | undefined;
}

export function AppointmentIcon({ className }: props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="19.923"
      height="19.923"
      viewBox="0 0 19.923 19.923"
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
      <g
        id="appointment_1_"
        data-name="appointment (1)"
        transform="translate(-5 -5)"
      >
        <path
          id="Path_105"
          data-name="Path 105"
          d="M22.206,6.811H21.3V5.906a.906.906,0,1,0-1.811,0v.906H10.434V5.906a.906.906,0,0,0-1.811,0v.906H7.717A2.717,2.717,0,0,0,5,9.528V22.206a2.717,2.717,0,0,0,2.717,2.717h14.49a2.717,2.717,0,0,0,2.717-2.717V9.528A2.717,2.717,0,0,0,22.206,6.811ZM7.717,8.622h.906v.906a.906.906,0,0,0,1.811,0V8.622H19.49v.906a.906.906,0,0,0,1.811,0V8.622h.906a.906.906,0,0,1,.906.906v2.717H6.811V9.528A.906.906,0,0,1,7.717,8.622Zm14.49,14.49H7.717a.906.906,0,0,1-.906-.906v-8.15h16.3v8.15A.906.906,0,0,1,22.206,23.112Z"
          transform="translate(0)"
          fill="#8f95a7"
        />
      </g>
    </svg>
  );
}
