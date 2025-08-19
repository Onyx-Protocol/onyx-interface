import { EthChainId } from 'types';

export const API_ENDPOINT_URLS = {
  [EthChainId.MAINNET]: 'https://v2api.onyx.org/api',
  [EthChainId.TESTNET]: 'https://testapi.onyx.org/api',
};

export const API_GOV_ENDPOINT_URLS = {
  [EthChainId.MAINNET]: 'https://govapi.onyx.org',
  [EthChainId.TESTNET]: 'https://testapi.onyx.org/gov',
};

export const RPC_URLS: {
  [key: string]: string[];
} = {
  [EthChainId.MAINNET]: ['https://mainnet.infura.io/v3/54af4f71d6c44e0ea83badb0886458f9'],
  [EthChainId.TESTNET]: ['https://goerli.infura.io/v3/54af4f71d6c44e0ea83badb0886458f9'],
};

export const SUBGRAPH_LINKS: { [key: number]: { [key: string]: string } } = {
  1: {
    legacy: 'https://api.studio.thegraph.com/query/102310/onyx_graph/version/latest/',
    latest:
      process.env.REACT_APP_THEGRAPH_ENDPOINT ??
      'https://api.studio.thegraph.com/query/102310/onyx_graph/version/latest/',
  },
  5: {
    legacy: 'https://api.thegraph.com/subgraphs/name/seme0801/onyx-goerli-subgraph',
    latest: process.env.REACT_APP_THEGRAPH_ENDPOINT ?? '',
  },
};

export const SUBSQUID_LINKS = {
  [EthChainId.MAINNET]: 'https://pnt-squid.onyx.org/graphql',
  [EthChainId.TESTNET]: 'https://pnt-squid.onyx.org/graphql',
};

export const POINTS_API_ENDPOINTS = {
  [EthChainId.MAINNET]: 'https://pnt.onyx.org/api/v1',
  [EthChainId.TESTNET]: 'https://testpnt.onyx.org/api/v1',
};
