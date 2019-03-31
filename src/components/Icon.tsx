import React from 'react';
import sprites from './sprites-solid.svg';
import styles from './Icon.module.css';

const Icon = ({
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
    >
      <use
        xlinkHref={`${sprites}#${icon}`}
        width={`${size}px`}
        height={`${size}px`}
      />
    </svg>
  );
};

export default Icon;
