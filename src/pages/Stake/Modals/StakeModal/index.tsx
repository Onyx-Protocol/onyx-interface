/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { getContractAddress } from 'utilities';

import { useStakeXcn } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface StakeModalProps extends Pick<ActionModalProps, 'handleClose'> {
  xcnBalance: BigNumber;
}

const StakeModal: React.FC<StakeModalProps> = ({ xcnBalance, handleClose }) => {
  const { t } = useTranslation();
  const { account } = useContext(AuthContext);

  const stakeToken = TOKENS.xcn;

  const spenderAddress = getContractAddress('xcnStaking');

  const { mutateAsync: stakeXcn, isLoading: isStakeXcnLoading } = useStakeXcn();

  const handleStake = async (amountWei: BigNumber) => {
    // Send request to stake
    const res = await stakeXcn({
      accountAddress: account?.address || '',
      amount: amountWei,
    });

    // Close modal
    handleClose();

    return res;
  };

  return (
    <ActionModal
      title={t('stakeModal.title', { tokenSymbol: stakeToken.symbol })}
      token={stakeToken}
      handleClose={handleClose}
      availableTokensWei={xcnBalance || new BigNumber(0)}
      isInitialLoading={false}
      onSubmit={handleStake}
      isSubmitting={isStakeXcnLoading}
      connectWalletMessage={t('stakeModal.connectWalletMessage', {
        tokenSymbol: stakeToken.symbol,
      })}
      tokenNeedsToBeEnabled
      enableTokenMessage="To stake XCN on Onyx Protocol, you need to enable it first."
      spenderAddress={spenderAddress}
      availableTokensLabel={t('stakeModal.availableTokensLabel', {
        tokenSymbol: stakeToken.symbol,
      })}
      submitButtonLabel={t('stakeModal.submitButtonLabel')}
      submitButtonDisabledLabel={t('stakeModal.submitButtonDisabledLabel')}
      successfulTransactionTitle={t('stakeModal.successfulTransactionModal.title')}
      successfulTransactionDescription={t('stakeModal.successfulTransactionModal.description')}
    />
  );
};

export default StakeModal;
