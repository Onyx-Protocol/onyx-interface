import { UNISWAP_TOKENS } from 'constants/tokens';

import wrapToken from '../wrapToken';

describe('pages/Swap/useGetSwapInfo/wrapToken', () => {
  it('returns token provided if its isNative field is false', () => {
    const wrappedToken = wrapToken(UNISWAP_TOKENS.usdt);

    expect(wrappedToken).toEqual(UNISWAP_TOKENS.usdt);
  });

  it('returns wBNB if provided token is BNB', () => {
    const wrappedToken = wrapToken(UNISWAP_TOKENS.eth);

    expect(wrappedToken).toEqual(UNISWAP_TOKENS.weth);
  });
});
