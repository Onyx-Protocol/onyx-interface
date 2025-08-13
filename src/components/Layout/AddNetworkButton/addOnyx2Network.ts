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

export const switchToOnyx = async () => {
  if (!window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13bf8' }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      console.log('Onyx chain not found, adding it...');

      toast.info({
        message: 'Adding Onyx network to your wallet...',
      });

      try {
        await addOnyx2Network();

        // After adding, we try to switch the chain antively again
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13bf8' }],
        });

        toast.success({
          message: 'Successfully switched to Onyx network!',
        });

        return true;
      } catch (addError) {
        console.error('Failed to add/switch to Onyx network:', addError);
        toast.error({
          message: 'Failed to add Onyx network. Please add it manually.',
        });
        return false;
      }
    } else {
      console.error('Failed to switch to Onyx chain:', switchError);
      toast.error({
        message: 'Failed to switch to Onyx network',
      });
      return false;
    }
  }
};
