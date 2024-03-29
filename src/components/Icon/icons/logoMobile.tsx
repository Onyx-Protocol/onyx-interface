import * as React from 'react';
import { SVGProps } from 'react';

const SvgLogoMobile = (props: SVGProps<SVGSVGElement>) => {
  const { id = 'logoMobile' } = props;
  const gradientId = `gradient_${id}`;
  return (
    <svg
      width="353"
      height="353"
      viewBox="0 0 353 353"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31.35 75.85C103.52 -27.16 253.77 -23.23 320.9 75.38C287.41 108.91 253.89 142.45 220.25 176.12C254.03 210.04 287.48 243.63 321.4 277.7C285.81 325.19 239.04 351.68 179.4 352.6C117.53 353.56 68.81 327.19 31.72 278.25C65.69 244.32 99.23 210.82 132.85 177.23C98.59 143.01 65.05 109.51 31.34 75.85H31.35ZM234.17 73.84C197.69 51.78 147.42 54.97 119.03 74.05C138.22 93.24 157.48 112.5 176.49 131.51C195.45 112.55 214.71 93.29 234.17 73.84ZM118.76 278.39C139.28 298.89 206.11 299.14 233.61 279.08C214.35 259.82 195.01 240.49 175.84 221.32C157.1 240.06 137.93 259.23 118.76 278.39Z"
        fill="currentColor"
      />
      <path
        d="M326.03 269.59C312.11 255.64 298.43 242 284.9 228.21C284.09 227.39 283.88 225.16 284.37 224C297.66 192.29 297.65 160.64 284.39 128.92C283.86 127.66 284.16 125.24 285.05 124.33C298.37 110.78 311.85 97.4 325.3 83.99C325.5 83.79 325.88 83.78 326.16 83.68C360.59 135.08 362.8 213.18 326.02 269.59H326.03Z"
        fill="currentColor"
      />
      <path
        d="M26.75 269.49C-9.48 214.18 -8.32 136.03 26.69 83.45C27.67 84.32 28.68 85.11 29.58 86.01C41.96 98.37 54.27 110.8 66.74 123.05C68.96 125.23 69.43 126.87 68.17 129.86C55.18 160.68 55.26 191.63 68.03 222.48C69.33 225.62 69.01 227.38 66.6 229.74C53.29 242.8 40.17 256.06 26.75 269.49Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="37.2475"
          y1="26.2516"
          x2="-5.57766"
          y2="-2.83053"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5433FF" />
          <stop offset="0.5" stopColor="#20BDFF" />
          <stop offset="1" stopColor="#5CFFA2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgLogoMobile;
