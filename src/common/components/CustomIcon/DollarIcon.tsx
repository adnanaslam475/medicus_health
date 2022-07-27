import React from "react";

interface props {
	className?: string | undefined;
}

export function DollarIcon({ className }: props) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="25"
			viewBox="0 0 8 19"
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
					d="M13.355 10.275H9.678a1.839 1.839 0 010-3.678h4.6a.919.919 0 01.919.919.919.919 0 101.839 0 2.758 2.758 0 00-2.758-2.758h-1.842V2.919a.919.919 0 10-1.839 0v1.839h-.919a3.678 3.678 0 000 7.355h3.678a1.839 1.839 0 110 3.678h-4.6a.919.919 0 01-.919-.919.919.919 0 00-1.839 0 2.758 2.758 0 002.76 2.758H10.6v1.839a.919.919 0 101.839 0V17.63h.919a3.678 3.678 0 000-7.355z"
					data-name="dollar (1)"
					transform="translate(-6 -2)"
				></path>
			</g>
		</svg>
	);
}
