import sample from 'lodash/sample';
import { EthChainId } from 'types';

import {
  API_ENDPOINT_URLS,
  API_GOV_ENDPOINT_URLS,
  POINTS_API_ENDPOINTS,
  RPC_URLS,
} from 'constants/endpoints';
import { ETH_SCAN_URLS } from 'constants/ethereum';

export interface Config {
  chainId: EthChainId;
  isOnTestnet: boolean;
  rpcUrl: string;
  apiUrl: string;
  apiGovUrl: string;
  ethScanUrl: string;
  apiPointUrl: string;
}

export const ONYX_CHAIN_ID = 80888;

const chainId: EthChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  : EthChainId.MAINNET;

const isOnTestnet = chainId === EthChainId.TESTNET;
const rpcUrl = sample(RPC_URLS[chainId]) as string;
const apiUrl = API_ENDPOINT_URLS[chainId];
const apiGovUrl = API_GOV_ENDPOINT_URLS[chainId];
const ethScanUrl = ETH_SCAN_URLS[chainId];
const apiPointUrl = POINTS_API_ENDPOINTS[chainId];

const config: Config = {
  chainId,
  isOnTestnet,
  rpcUrl,
  apiUrl,
  apiGovUrl,
  ethScanUrl,
  apiPointUrl,
};

export default config;
