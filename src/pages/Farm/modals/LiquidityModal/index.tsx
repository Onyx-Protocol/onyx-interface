/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { ConnectWallet, Modal, ModalProps } from 'components';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';

import { Farm, getAddress, useAddLiquidity } from 'clients/api';
import { AuthContext } from 'context/AuthContext';
import LiquidityTxForm from 'pages/Farm/LiquidityTxForm';

export interface LiquidityModalProps extends Pick<ModalProps, 'handleClose'> {
  farm: Farm;
}

const LiquidityModal: React.FC<LiquidityModalProps> = ({ farm, handleClose }) => {
  const { t } = useTranslation();
  const { account } = useContext(AuthContext);

  const stakeToken: Token = React.useMemo(
    () => ({
      id: farm.lpSymbol,
      symbol: farm.lpSymbol,
      decimals: 18,
      address: getAddress(farm.lpAddresses),
      asset: '',
    }),
    [farm.lpSymbol],
  );

  const { mutateAsync: addLiquidity, isLoading: isAddLiquidityLoading } = useAddLiquidity();

  const handleAddLiquidity = async (amountWei1: BigNumber, amountWei2: BigNumber) => {
    // Send request to stake
    const res = await addLiquidity({
      fromAccountAddress: account?.address || '',
      token1: farm.token.address,
      token2: farm.quoteToken.address,
      amountWei1,
      amountWei2,
    });

    // Close modal
    handleClose();

    return res;
  };

  return (
    <Modal isOpen title={t('liquidityModal.title')} handleClose={handleClose}>
      <ConnectWallet
        message={t('liquidityModal.connectWalletMessage', {
          tokenSymbol: stakeToken.symbol,
        })}
      >
        <LiquidityTxForm
          farm={farm}
          submitButtonLabel={t('liquidityModal.submitButtonLabel')}
          successfulTransactionTitle={t('liquidityModal.successfulTransactionModal.title')}
          successfulTransactionDescription={t(
            'liquidityModal.successfulTransactionModal.description',
          )}
          availableTokensLabel1={t('liquidityModal.availableTokensLabel', {
            tokenSymbol: farm.token.symbol,
          })}
          availableTokensLabel2={t('liquidityModal.availableTokensLabel', {
            tokenSymbol: farm.quoteToken.symbol,
          })}
          onSubmit={handleAddLiquidity}
          isSubmitting={isAddLiquidityLoading}
        />
      </ConnectWallet>
    </Modal>
  );

  // return (
  //   <ActionModal
  //     title={t('liquidityModal.title', { tokenSymbol: stakeToken.symbol })}
  //     token={stakeToken}
  //     token1={farm.token}
  //     token2={farm.quoteToken}
  //     handleClose={handleClose}
  //     availableTokensWei={farm.userData?.tokenBalance || new BigNumber(0)}
  //     isInitialLoading={false}
  //     onSubmit={handleStake}
  //     isSubmitting={isStakeLoading}
  //     connectWalletMessage={t('liquidityModal.connectWalletMessage', {
  //       tokenSymbol: stakeToken.symbol,
  //     })}
  //     tokenNeedsToBeEnabled
  //     enableTokenMessage={t('stakeModal.enableTokenMessage', { tokenSymbol: stakeToken.symbol })}
  //     spenderAddress={spenderAddress}
  //     availableTokensLabel={t('liquidityModal.availableTokensLabel', {
  //       tokenSymbol: stakeToken.symbol,
  //     })}
  //     submitButtonLabel={t('liquidityModal.submitButtonLabel')}
  //     submitButtonDisabledLabel={t('liquidityModal.submitButtonDisabledLabel')}
  //     successfulTransactionTitle={t('liquidityModal.successfulTransactionModal.title')}
  //     successfulTransactionDescription={t('liquidityModal.successfulTransactionModal.description')}
  //   />
  // );
};

export default LiquidityModal;
