import { encodeParameters, parseFunctionSignature } from 'utilities';

import formatIfArray from './formatIfArray';

const encodeCallData = (signature: string, callData: (string | undefined)[]) => {
  const callDataTypes = parseFunctionSignature(signature)?.inputs.map(input => input.type);
  const processedCallData = callData.reduce((acc, curr, currentIndex) => {
    if (curr !== undefined) {
      if (callDataTypes && callDataTypes[currentIndex] === 'bool') {
        if (curr === '0' || curr === 'false' || curr === 'FALSE') acc.push(0);
        else acc.push(1);
      } else acc.push(formatIfArray(curr));
    }
    return acc;
  }, [] as (string | number | string[])[]);
  return encodeParameters(callDataTypes || [], processedCallData);
};

export default encodeCallData;
