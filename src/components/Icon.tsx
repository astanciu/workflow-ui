import React from 'react';
import sprites from '../Assets/sprites-solid.svg';
import styles from './Icon.module.css';

export const Icon = ({
  icon = 'cog',
  size = 50,
  className = null,
  color = '#34373c'
}) => {
  return (
    <svg
      className={styles.Icon}
      width={`${size}px`}
      height={`${size}px`}
      fill={color}
      stroke={color}
    >
      <use
        xlinkHref={`${sprites}#${icon}`}
        width={`${size}px`}
        height={`${size}px`}
      />
    </svg>
  );
};
