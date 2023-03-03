/* eslint-disable no-nested-ternary */
import BigNumber from 'bignumber.js';
import { shortenValueWithSuffix } from 'utilities';

import PLACEHOLDER_KEY from 'constants/placeholderKey';

const formatCentsToReadableValue = ({
  value,
  shortenLargeValue = false,
}: {
  value: number | BigNumber | undefined;
  shortenLargeValue?: boolean;
}) => {
  if (value === undefined) {
    return PLACEHOLDER_KEY;
  }

  const wrappedValueDollars = new BigNumber(value).dividedBy(100);

  if (!shortenLargeValue) {
    return `$${
      wrappedValueDollars.gt(0.01)
        ? wrappedValueDollars.toFormat(2)
        : wrappedValueDollars.gt(0.001)
        ? wrappedValueDollars.toFormat(3)
        : wrappedValueDollars.gt(0.0001)
        ? wrappedValueDollars.toFormat(4)
        : wrappedValueDollars.toFormat(5)
    }`;
  }

  // Shorten value
  const shortenedValue = shortenValueWithSuffix({
    value: wrappedValueDollars,
    outputsDollars: true,
  });

  return `$${shortenedValue}`;
};

export default formatCentsToReadableValue;
