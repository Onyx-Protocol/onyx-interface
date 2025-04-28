import * as React from 'react';
import { SVGProps } from 'react';

const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.59 15.41L12 10.83L7.41 15.41L6 14L12 8L18 14L16.59 15.41Z" fill="currentColor" />
  </svg>
);

export default SvgChevronUp;
