import * as React from 'react';
import { SVGProps } from 'react';

const SvgTurkey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 -4 28 28"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_503_4206)">
      <rect width="28" height="20" rx="2" fill="white" />
      <mask
        id="mask0_503_4206"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="20"
      >
        <rect width="28" height="20" rx="2" fill="white" />
      </mask>
      <g mask="url(#mask0_503_4206)">
        <rect width="28" height="20" fill="#E92434" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.0208 10.7684L17.796 12.2533L17.8795 10.3302L16.0887 9.62423L17.9434 9.1093L18.0615 7.18799L19.1244 8.79287L20.9881 8.31142L19.7902 9.81822L20.8241 11.442L19.0208 10.7684V10.7684V10.7684V10.7684Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4028 13.6838C16.3049 15.0934 14.5916 16 12.6665 16C9.3528 16 6.6665 13.3137 6.6665 10C6.6665 6.68629 9.3528 4 12.6665 4C14.5916 4 16.3049 4.90659 17.4028 6.31611C16.5555 5.70019 15.4902 5.33331 14.333 5.33331C11.5716 5.33331 9.33301 7.42265 9.33301 9.99998C9.33301 12.5773 11.5716 14.6666 14.333 14.6666C15.4902 14.6666 16.5556 14.2997 17.4028 13.6838Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_503_4206">
        <rect width="28" height="20" rx="2" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgTurkey;
