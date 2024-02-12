import BigNumber from 'bignumber.js';
import { Token } from 'types';

import PLACEHOLDER_KEY from 'constants/placeholderKey';

import { shortenValueWithSuffix } from './shortenValueWithSuffix';

export const formatTokensToReadableValue = ({
  value,
  token,
  minimizeDecimals = false,
  shortenLargeValue = false,
  addSymbol = true,
  removeDecimals = false,
}: {
  value: BigNumber | undefined;
  token: Token;
  minimizeDecimals?: boolean;
  shortenLargeValue?: boolean;
  addSymbol?: boolean;
  removeDecimals?: boolean;
}) => {
  if (value === undefined) {
    return PLACEHOLDER_KEY;
  }

  let decimalPlaces;
  if (minimizeDecimals) {
    decimalPlaces = 4;
  } else {
    decimalPlaces = token.decimals;
  }

  if (removeDecimals) {
    decimalPlaces = 0;
  }

  let symbolPlacement = '';
  if (addSymbol) {
    symbolPlacement = ` ${token.symbol}`;
  }

  if (shortenLargeValue) {
    return `${shortenValueWithSuffix({
      value,
    })}${symbolPlacement}`;
  }

  return `${value.dp(decimalPlaces).toFormat()}${symbolPlacement}`;
};

export default formatTokensToReadableValue;
