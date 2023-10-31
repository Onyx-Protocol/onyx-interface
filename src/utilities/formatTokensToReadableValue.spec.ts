import BigNumber from 'bignumber.js';
import { formatTokensToReadableValue } from 'utilities';

import { TOKENS } from 'constants/tokens';

describe('utilities/formatTokensToReadableValue', () => {
  test('formats longhand value correctly', () => {
    const value = formatTokensToReadableValue({
      value: new BigNumber(100000.12333334),
      token: TOKENS.eth,
    });
    expect(value).toBe('100,000.12333334 ETH');
  });

  test('formats shorthand value correctly', () => {
    const value = formatTokensToReadableValue({
      value: new BigNumber(0.1234567899999),
      token: TOKENS.xcn,
      minimizeDecimals: true,
    });
    expect(value).toBe('0.1235 XCN');
  });

  test('removes trailing zeros', () => {
    const trailingZeroNumber = new BigNumber(0.0000005);
    const value = formatTokensToReadableValue({
      value: trailingZeroNumber,
      token: TOKENS.xcn,
      minimizeDecimals: true,
    });
    expect(trailingZeroNumber.toFixed(8)).toBe('0.00000050');
    expect(value).toBe('0 XCN');
  });
});
