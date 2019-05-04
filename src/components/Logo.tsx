import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-block;
  margin: 11px 10px;
`;

export const Logo = ({ size = 30 }) => {
  return (
    <LogoContainer>
      <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 488 309">
        <defs>
          <linearGradient id="a" x1=".26%" x2="101.26%" y1="49.75%" y2="49.75%">
            <stop offset="0%" stopColor="#3023AE" />
            <stop offset="47.52%" stopColor="#53A0FD" />
            <stop offset="100%" stopColor="#B4EC51" />
          </linearGradient>
          <linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path
            fill="url(#a)"
            d="M134.23 273a42.56 42.56 0 0 1-38.37-23.93L4.32 61.27a42.6 42.6 0 0 1 19.6-56.95 42.55 42.55 0 0 1 56.9 19.6l53.4 109.57 53.4-109.56A42.56 42.56 0 0 1 226 0a42.56 42.56 0 0 1 38.37 23.93l53.4 109.56 53.4-109.56A42.55 42.55 0 0 1 428.1 4.32a42.6 42.6 0 0 1 19.6 56.95l-91.55 187.8A42.56 42.56 0 0 1 317.77 273a42.56 42.56 0 0 1-38.37-23.93L226 139.51l-53.4 109.56A42.56 42.56 0 0 1 134.23 273z"
            transform="translate(18 18)"
          />
          <path
            fill="url(#b)"
            d="M134.23 133.49l38.13 78.24A42.6 42.6 0 0 1 134.23 273a42.6 42.6 0 0 1-38.14-61.27l38.14-78.24zm183.54 0l38.14 78.24A42.6 42.6 0 0 1 317.77 273a42.6 42.6 0 0 1-38.14-61.27l38.14-78.24zM226 139.5l-38.14-78.24A42.6 42.6 0 0 1 226 0a42.6 42.6 0 0 1 38.14 61.27L226 139.5zm183.55 0L371.4 61.27A42.6 42.6 0 0 1 409.55 0a42.6 42.6 0 0 1 38.14 61.27l-38.14 78.24zm-367.1 0L4.32 61.27A42.6 42.6 0 0 1 42.45 0 42.6 42.6 0 0 1 80.6 61.27L42.45 139.5z"
            transform="translate(18 18)"
          />
          <path
            stroke="#FFF"
            strokeWidth="18"
            d="M152.23 300a51.55 51.55 0 0 1-46.46-28.99L14.23 83.21a51.6 51.6 0 0 1 23.74-68.98A51.55 51.55 0 0 1 106.92 38l45.3 92.96 45.32-92.96A51.54 51.54 0 0 1 243.98 9a51.55 51.55 0 0 1 46.48 28.99l45.31 92.96 45.31-92.96a51.55 51.55 0 0 1 68.95-23.76 51.6 51.6 0 0 1 23.74 68.98l-91.54 187.8A51.54 51.54 0 0 1 335.8 300a51.55 51.55 0 0 1-46.48-28.99L244 178.05l-45.31 92.96A51.55 51.55 0 0 1 152.23 300z"
          />
        </g>
      </svg>
    </LogoContainer>
  );
};
