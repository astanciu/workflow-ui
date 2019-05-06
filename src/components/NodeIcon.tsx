import React from 'react';
import sprites from 'Assets/sprites-solid.svg';

export const HTMLNodeIcon = ({ icon, size }) => {
  // const iconSize = size * 0.7;
  // const iconTranslate = size - iconSize / 2;
  const iconSize = 30;
  const iconTranslate = 40 - iconSize / 2;
  return (
    <svg viewBox="0 0 80 80" width={`${size}px`} height={`${size}px`}>
      <g id="Node">
        <g id="Hexgons">
          <polygon
            stroke="#000000"
            fill="none"
            strokeWidth="1"
            points="40 0 74.6410162 19.75 74.6410162 59.25 40 79 5.35898385 59.25 5.35898385 19.75"
          />
          <polygon
            fill="#34373c"
            points="40 5 70.3108891 22.25 70.3108891 56.75 40 74 9.68911087 56.75 9.68911087 22.25"
          />
        </g>
        <use
          xlinkHref={`${sprites}#${icon}`}
          transform={`translate(${iconTranslate},${iconTranslate}) `}
          width={`${iconSize}px`}
          height={`${iconSize}px`}
          fill="#d1d7e4"
        />
      </g>
    </svg>
  );
};
