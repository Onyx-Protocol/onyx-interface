import BigNumber from 'bignumber.js';
import { ExactAmountInSwap, ExactAmountOutSwap } from 'types';
import { convertTokensToWei } from 'utilities';

import { UNISWAP_TOKENS } from 'constants/tokens';

export const FAKE_DEFAULT_BALANCE_TOKENS = '1';

export const FAKE_ETH_BALANCE_TOKENS = '10';
export const FAKE_ETH_BALANCE_WEI = convertTokensToWei({
  value: new BigNumber(FAKE_ETH_BALANCE_TOKENS),
  token: UNISWAP_TOKENS.eth,
});

export const FAKE_USDT_BALANCE_TOKENS = '20';
export const FAKE_USDT_BALANCE_WEI = convertTokensToWei({
  value: new BigNumber(FAKE_USDT_BALANCE_TOKENS),
  token: UNISWAP_TOKENS.usdt,
});

export const FAKE_UNI_BALANCE_TOKENS = '30';
export const FAKE_UNI_BALANCE_WEI = convertTokensToWei({
  value: new BigNumber(FAKE_UNI_BALANCE_TOKENS),
  token: UNISWAP_TOKENS.uni,
});

export const FAKE_XCN_BALANCE_TOKENS = '100';
export const FAKE_XCN_BALANCE_WEI = convertTokensToWei({
  value: new BigNumber(FAKE_XCN_BALANCE_TOKENS),
  token: UNISWAP_TOKENS.xcn,
});

export const fakeExactAmountInSwap: ExactAmountInSwap = {
  fromToken: UNISWAP_TOKENS.eth,
  fromTokenAmountSoldWei: FAKE_ETH_BALANCE_WEI,
  toToken: UNISWAP_TOKENS.xcn,
  minimumToTokenAmountReceivedWei: FAKE_ETH_BALANCE_WEI.multipliedBy(1.5),
  expectedToTokenAmountReceivedWei: FAKE_XCN_BALANCE_WEI.multipliedBy(2),
  direction: 'exactAmountIn',
  routePath: [UNISWAP_TOKENS.eth.address, UNISWAP_TOKENS.xcn.address],
  exchangeRate: new BigNumber(2),
};

export const fakeExactAmountOutSwap: ExactAmountOutSwap = {
  fromToken: UNISWAP_TOKENS.eth,
  expectedFromTokenAmountSoldWei: FAKE_ETH_BALANCE_WEI.multipliedBy(1.5),
  maximumFromTokenAmountSoldWei: FAKE_ETH_BALANCE_WEI.multipliedBy(2),
  toToken: UNISWAP_TOKENS.xcn,
  toTokenAmountReceivedWei: FAKE_XCN_BALANCE_WEI,
  direction: 'exactAmountOut',
  routePath: [UNISWAP_TOKENS.eth.address, UNISWAP_TOKENS.xcn.address],
  exchangeRate: new BigNumber(2),
};

export const fakeNonNativeSwap: ExactAmountInSwap = {
  fromToken: UNISWAP_TOKENS.uni,
  fromTokenAmountSoldWei: FAKE_UNI_BALANCE_WEI,
  toToken: UNISWAP_TOKENS.xcn,
  minimumToTokenAmountReceivedWei: FAKE_XCN_BALANCE_WEI.multipliedBy(1.5),
  expectedToTokenAmountReceivedWei: FAKE_XCN_BALANCE_WEI.multipliedBy(2),
  direction: 'exactAmountIn',
  routePath: [UNISWAP_TOKENS.uni.address, UNISWAP_TOKENS.xcn.address],
  exchangeRate: new BigNumber(2),
};
