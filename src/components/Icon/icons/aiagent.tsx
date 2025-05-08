import * as React from 'react';
import { SVGProps } from 'react';

const SvgAiagent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="white"
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_7857_60846)">
      <path d="M9 7V4H7" />
      <rect width="12" height="8" x="2" y="7.5" rx="2" />
      <path d="M0 12h2" />
      <path d="M14 12h2" />
      <path d="M11 11v2" />
      <path d="M5 11v2" />
    </g>
    <defs>
      <clipPath id="clip0_7857_60846">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgAiagent;
