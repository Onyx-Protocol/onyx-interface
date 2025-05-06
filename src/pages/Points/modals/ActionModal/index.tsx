/** @jsxImportSource @emotion/react */
import { Box, Typography } from '@mui/material';
import { Button, ConnectWallet, Modal, ModalProps, Spinner } from 'components';
import React from 'react';

import getSignedMessage from 'clients/api/queries/getSignedMessage';
import verifySignature from 'clients/api/queries/useVerifysignature';
import { useWeb3 } from 'clients/web3';
import { AuthContext } from 'context/AuthContext';

import { useStyles } from '../../styles';

export interface ActionModalProps extends Pick<ModalProps, 'handleClose'> {
  title: ModalProps['title'];
  isInitialLoading: boolean;
  connectWalletMessage: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  handleClose,
  isInitialLoading,
  title,
  connectWalletMessage,
}) => {
  const styles = useStyles();
  const { account } = React.useContext(AuthContext);
  const web3 = useWeb3();
  const signMessage = async () => {
    if (!account) {
      return;
    }

    try {
      const messageRes = await getSignedMessage({ address: account.address });

      const signatureRes = await web3.eth.personal.sign(
        messageRes.signedMessage,
        account.address,
        '',
      );

      await verifySignature({
        signature: signatureRes,
        signedMessage: messageRes.signedMessage,
        address: account.address,
      });
      handleClose();
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  };

  return (
    <Modal isOpen title={title} handleClose={handleClose}>
      {isInitialLoading ? (
        <Spinner />
      ) : (
        <ConnectWallet message={`${connectWalletMessage}`}>
          <Typography color="text.secondary" sx={{ fontSize: '12px', marginBottom: '28px' }}>
            {connectWalletMessage}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              css={styles.menuMobileButton}
              variant="secondaryConnectWallet"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              css={styles.menuMobileButton}
              variant="secondaryConnectWallet"
              onClick={signMessage}
            >
              Enroll now!
            </Button>
          </Box>
        </ConnectWallet>
      )}
    </Modal>
  );
};

export default ActionModal;
