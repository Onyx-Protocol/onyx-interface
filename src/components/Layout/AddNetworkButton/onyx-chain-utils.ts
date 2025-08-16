import { toast } from '../../Toast';

export interface ChainConfig {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
}

export const addNetwork = async (chainConfig: ChainConfig) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [chainConfig],
      });
    } catch {
      console.error('Error adding network');
    }
  } else {
    toast.error({ message: 'No ethereum wallet found!' });
  }
};

export const switchToChain = async (chainConfig: ChainConfig) => {
  if (!window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainConfig.chainId }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      toast.info({
        message: `Adding ${chainConfig.chainName} network to your wallet...`,
      });

      try {
        await addNetwork(chainConfig);

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainConfig.chainId }],
        });

        toast.success({
          message: `Successfully switched to ${chainConfig.chainName} network!`,
        });

        return true;
      } catch (addError) {
        toast.error({
          message: `Failed to add ${chainConfig.chainName} network. Please add it manually.`,
        });
        return false;
      }
    } else {
      toast.error({
        message: `Failed to switch to ${chainConfig.chainName} network`,
      });
      return false;
    }
  }
};

export const addOnyx2Network = async () => {
  const onyxConfig: ChainConfig = {
    chainId: '0x13bf8',
    chainName: 'Onyx',
    rpcUrls: ['https://rpc.onyx.org'],
    nativeCurrency: {
      name: 'XCN',
      symbol: 'XCN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.onyx.org'],
  };

  await addNetwork(onyxConfig);
};

export const switchToOnyx = async () => {
  const onyxConfig: ChainConfig = {
    chainId: '0x13bf8',
    chainName: 'Onyx',
    rpcUrls: ['https://rpc.onyx.org'],
    nativeCurrency: {
      name: 'XCN',
      symbol: 'XCN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.onyx.org'],
  };

  return switchToChain(onyxConfig);
};
