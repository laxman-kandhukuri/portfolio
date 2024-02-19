import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* Outer polygon */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
        {/* 'L' representing 3:00 */}
        <path
          fill="hsl(162, 95%, 78%)"
          d="M50 40 L50 60 L70 60 L70 50 L60 50 L60 40 Z"
        />
      </g>
    </g>
  </svg>
);

export default IconLogo;
