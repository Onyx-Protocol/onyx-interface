import BigNumber from 'bignumber.js';
import { EthChainId } from 'types';

import { Farm } from 'clients/api';
import { TOKENS } from 'constants/tokens';

export const farms: Farm[] = [
  {
    pid: 2,
    lpSymbol: 'XCN-ETH LP',
    lpAddresses: {
      [EthChainId.MAINNET]: '0x006Df670C4735A18422B8c75F06d891D67e6B405',
      [EthChainId.TESTNET]: '0x006Df670C4735A18422B8c75F06d891D67e6B405',
    },
    token: TOKENS.xcn,
    quoteToken: TOKENS.eth,
    tokenAmount: new BigNumber(0),
    quoteTokenAmount: new BigNumber(0),
    lpTotalInQuoteToken: new BigNumber(0),
    tokenPriceVsQuote: new BigNumber(0),
    poolWeight: new BigNumber(0),
    lpTokenBalanceMC: new BigNumber(0),
    tokenPerSecond: new BigNumber(0),
    farmApr: 0,
    userData: {
      allowance: new BigNumber(0),
      tokenBalance: new BigNumber(0),
      stakedBalance: new BigNumber(0),
      earnings: new BigNumber(0),
    },
  },

  {
    pid: 3,
    lpSymbol: 'XCN-USDT LP',
    lpAddresses: {
      [EthChainId.MAINNET]: '0xe346BcA6aDFCA5E6474a43E1d73270E43e80F41e',
      [EthChainId.TESTNET]: '0xe346BcA6aDFCA5E6474a43E1d73270E43e80F41e',
    },
    token: TOKENS.xcn,
    quoteToken: TOKENS.usdt,
    tokenAmount: new BigNumber(0),
    quoteTokenAmount: new BigNumber(0),
    lpTotalInQuoteToken: new BigNumber(0),
    tokenPriceVsQuote: new BigNumber(0),
    poolWeight: new BigNumber(0),
    lpTokenBalanceMC: new BigNumber(0),
    tokenPerSecond: new BigNumber(0),
    farmApr: 0,
    userData: {
      allowance: new BigNumber(0),
      tokenBalance: new BigNumber(0),
      stakedBalance: new BigNumber(0),
      earnings: new BigNumber(0),
    },
  },
];
