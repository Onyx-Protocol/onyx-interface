import BigNumber from 'bignumber.js';
import { Multicall } from 'ethereum-multicall';
import { EthChainId, Token } from 'types';

export interface Address {
  [EthChainId.MAINNET]: string;
  [EthChainId.TESTNET]: string;
}

export interface FarmConfig {
  pid: number;
  lpSymbol: Uppercase<string>;
  lpAddresses: Address;
  token: Token;
  quoteToken: Token;
  multiplier?: string;
}

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber;
  quoteTokenAmount?: BigNumber;
  lpTotalInQuoteToken?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  poolWeight?: BigNumber;
  lpTokenBalanceMC?: BigNumber;
  tokenPerSecond?: BigNumber;
  farmApr?: number;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
  };
}

export interface GetFarmsInput {
  multicall: Multicall;
  accountAddress: string;
}

export type GetFarmsOutput = {
  farms: Farm[];
};

export const getAddress = (address: Address): string => {
  const chainId: EthChainId = process.env.REACT_APP_CHAIN_ID
    ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    : EthChainId.MAINNET;
  return address[chainId];
};
