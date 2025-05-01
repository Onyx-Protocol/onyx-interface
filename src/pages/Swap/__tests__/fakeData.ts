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
  token: UNISWAP_TOKENS.weth,
});

export const fakeExactAmountInSwap: ExactAmountInSwap = {
  fromToken: UNISWAP_TOKENS.eth,
  fromTokenAmountSoldWei: FAKE_ETH_BALANCE_WEI,
  toToken: UNISWAP_TOKENS.usdt,
  minimumToTokenAmountReceivedWei: FAKE_ETH_BALANCE_WEI.multipliedBy(1.5),
  expectedToTokenAmountReceivedWei: FAKE_ETH_BALANCE_WEI.multipliedBy(2),
  direction: 'exactAmountIn',
  routePath: [UNISWAP_TOKENS.eth.address, UNISWAP_TOKENS.usdt.address],
  exchangeRate: new BigNumber(2),
};

export const fakeExactAmountOutSwap: ExactAmountOutSwap = {
  fromToken: UNISWAP_TOKENS.eth,
  expectedFromTokenAmountSoldWei: FAKE_USDT_BALANCE_WEI.multipliedBy(1.5),
  maximumFromTokenAmountSoldWei: FAKE_USDT_BALANCE_WEI.multipliedBy(2),
  toToken: UNISWAP_TOKENS.usdt,
  toTokenAmountReceivedWei: FAKE_USDT_BALANCE_WEI,
  direction: 'exactAmountOut',
  routePath: [UNISWAP_TOKENS.eth.address, UNISWAP_TOKENS.usdt.address],
  exchangeRate: new BigNumber(2),
};

export const fakeNonNativeSwap: ExactAmountInSwap = {
  fromToken: UNISWAP_TOKENS.weth,
  fromTokenAmountSoldWei: FAKE_UNI_BALANCE_WEI,
  toToken: UNISWAP_TOKENS.usdt,
  minimumToTokenAmountReceivedWei: FAKE_UNI_BALANCE_WEI.multipliedBy(1.5),
  expectedToTokenAmountReceivedWei: FAKE_UNI_BALANCE_WEI.multipliedBy(2),
  direction: 'exactAmountIn',
  routePath: [UNISWAP_TOKENS.weth.address, UNISWAP_TOKENS.usdt.address],
  exchangeRate: new BigNumber(2),
};
