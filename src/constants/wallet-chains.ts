import { WalletChainIds } from 'types';

import { ChainConfig } from 'components/Layout/AddNetworkButton/onyxChainUtils';

export interface SupportedChain {
  id: WalletChainIds;
  config: ChainConfig;
  name: string;
  displayName: string;
  icon?: string;
}

export const SUPPORTED_CHAINS: SupportedChain[] = [
  {
    id: WalletChainIds.MAINNET,
    name: 'ethereum',
    displayName: 'Ethereum',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    config: {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      rpcUrls: ['https://mainnet.infura.io/v3/54af4f71d6c44e0ea83badb0886458f9'],
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://etherscan.io'],
    },
  },
  {
    id: WalletChainIds.BSC,
    name: 'bsc',
    displayName: 'BSC',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
    config: {
      chainId: '0x38',
      chainName: 'Binance Smart Chain',
      rpcUrls: ['https://binance.llamarpc.com'],
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      blockExplorerUrls: ['https://bscscan.com'],
    },
  },
  {
    id: WalletChainIds.BASE,
    name: 'base',
    displayName: 'Base',
    icon: 'https://images.mirror-media.xyz/publication-images/cgqxxPdUFBDjgKna_dDir.png?height=1200&width=1200',
    config: {
      chainId: '0x2105',
      chainName: 'Base',
      rpcUrls: ['https://base.llamarpc.com'],
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://basescan.org'],
    },
  },
  {
    id: WalletChainIds.ONYX,
    name: 'onyx',
    displayName: 'Onyx',
    icon: 'https://storage.googleapis.com/conduit-prd-apps-web-cdn/onyx-6l1k4gho61-99f735d7-1b2e-45a1-8e0e-610b71152472.png',
    config: {
      chainId: '0x13bf8',
      chainName: 'Onyx',
      rpcUrls: ['https://80888.rpc.thirdweb.com/6518b486fd02052fb8a45dd0e8e6d3d1'],
      nativeCurrency: {
        name: 'XCN',
        symbol: 'XCN',
        decimals: 18,
      },
      blockExplorerUrls: ['https://explorer.onyx.org'],
    },
  },
];

export const getChainById = (chainId: number): SupportedChain | undefined =>
  SUPPORTED_CHAINS.find(chain => chain.id === chainId);

export const getChainByHexId = (hexChainId: string): SupportedChain | undefined => {
  const chainId = parseInt(hexChainId, 16);
  return getChainById(chainId);
};

export const getRpcUrlsByChainId = (): Record<number, string> => {
  const rpcMap: Record<number, string> = {};

  SUPPORTED_CHAINS.forEach(chain => {
    const chainId = parseInt(chain.config.chainId, 16);
    const [firstRpcUrl] = chain.config.rpcUrls;
    rpcMap[chainId] = firstRpcUrl;
  });

  return rpcMap;
};
