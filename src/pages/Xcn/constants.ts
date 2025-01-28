import BigNumber from 'bignumber.js';

import { TOKENS } from 'constants/tokens';

export const MINTED_XCN = '10000000000';
export const MINTED_XCN_WEI = new BigNumber(MINTED_XCN).times(
  new BigNumber(10).pow(TOKENS.xcn.decimals),
);
