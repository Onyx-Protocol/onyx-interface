import sample from 'lodash/sample';
import { EthChainId } from 'types';

import { ETH_SCAN_URLS } from 'constants/ethereum';
import { API_ENDPOINT_URLS, API_GOV_ENDPOINT_URLS, RPC_URLS } from 'constants/endpoints';

export interface Config {
  chainId: EthChainId;
  isOnTestnet: boolean;
  rpcUrl: string;
  apiUrl: string;
  apiGovUrl: string;
  ethScanUrl: string;
}

const chainId: EthChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  : EthChainId.MAINNET;

const isOnTestnet = chainId === EthChainId.TESTNET;
const rpcUrl = sample(RPC_URLS[chainId]) as string;
const apiUrl = API_ENDPOINT_URLS[chainId];
const apiGovUrl = API_GOV_ENDPOINT_URLS[chainId];
const ethScanUrl = ETH_SCAN_URLS[chainId];

const config: Config = {
  chainId,
  isOnTestnet,
  rpcUrl,
  apiUrl,
  apiGovUrl,
  ethScanUrl,
};

export default config;
