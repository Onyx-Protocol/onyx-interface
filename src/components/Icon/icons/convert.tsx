import * as React from 'react';
import { SVGProps } from 'react';

const SvgConvert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.1522 9.68675L10.3041 6.12697H11.7472V3.31684H4.25349V6.12697H1.44336V2.84849C1.44336 1.5573 2.49394 0.506714 3.78513 0.506714H12.2155C13.5067 0.506714 14.5573 1.5573 14.5573 2.84849V6.12697H16.0003L13.1522 9.68675Z"
      fill="currentColor"
    />
    <path
      d="M12.2152 16.4933H3.78481C2.49361 16.4933 1.44303 15.4427 1.44303 14.1515V10.873H0L2.8481 7.31323L5.69619 10.873H4.25316V13.6831H11.7468V10.873H14.557V14.1515C14.557 15.4427 13.5064 16.4933 12.2152 16.4933Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgConvert;
