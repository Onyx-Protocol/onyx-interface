/** @jsxImportSource @emotion/react */
import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'translation';

import xcn from 'assets/img/xcnLogoPureB.svg';

import { ButtonProps, SecondaryButton } from '../../Button';
import { toast } from '../../Toast';

export const AddNetworkButton: React.FC<ButtonProps> = ({ css, ...props }) => {
  const { t } = useTranslation();

  const addOnyx2Network = async () => {
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

  return (
    <SecondaryButton onClick={addOnyx2Network} variant="secondaryConnectWallet" {...props}>
      <Box css={css}>
        <img src={xcn} alt="XCN" css={{ width: 20, height: 20, marginRight: 8 }} />
        {t('addNetworkButton.title')}
      </Box>
    </SecondaryButton>
  );
};

export default AddNetworkButton;
