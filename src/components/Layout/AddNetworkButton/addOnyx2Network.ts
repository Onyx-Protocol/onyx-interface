import { toast } from '../../Toast';

export const addOnyx2Network = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13bf8',
            chainName: 'Onyx',
            rpcUrls: ['https://rpc.onyx.org'],
            nativeCurrency: {
              name: 'XCN',
              symbol: 'XCN',
              decimals: 18,
            },
            blockExplorerUrls: ['https://explorer.onyx.org'],
          },
        ],
      });
    } catch (error) {
      console.error('Error adding network:', error);
    }
  } else {
    toast.error({ message: 'MetaMask is not installed!' });
  }
};
