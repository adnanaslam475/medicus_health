/* eslint-disable react/no-unknown-property */
interface props {
  className?: string | undefined;
}

export function ChatBubbleIcon({ className }: props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
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
          id="chat-bubble"
          d="M17.3,2H4.7A2.7,2.7,0,0,0,2,4.7v9a2.7,2.7,0,0,0,2.7,2.7H15.131l3.33,3.339A.9.9,0,0,0,19.1,20a.756.756,0,0,0,.342-.072A.9.9,0,0,0,20,19.1V4.7A2.7,2.7,0,0,0,17.3,2Zm.9,14.931-2.061-2.07A.9.9,0,0,0,15.5,14.6H4.7a.9.9,0,0,1-.9-.9v-9a.9.9,0,0,1,.9-.9H17.3a.9.9,0,0,1,.9.9Z"
          transform="translate(-2 -2)"
          fill="#8f95a7"
        />
      </g>
    </svg>
  );
}
