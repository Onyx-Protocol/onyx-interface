import { EthChainId } from 'types';

export const BLOCK_TIME_MS = 12000;
// 20 blocks a minute, 60 minutes an hour, 24 hours a day
export const BLOCKS_PER_DAY = (60 / (BLOCK_TIME_MS / 1000)) * 60 * 24;

export const ETH_SCAN_URLS = {
  [EthChainId.MAINNET]: 'https://etherscan.io',
  [EthChainId.TESTNET]: 'https://goerli.etherscan.io',
};
