/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';

import { useWithdrawXcn } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface WithdrawModalProps extends Pick<ActionModalProps, 'handleClose'> {
  stakedBalance: BigNumber;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ stakedBalance, handleClose }) => {
  const { t } = useTranslation();
  const { account } = useContext(AuthContext);

  const withdrawToken = TOKENS.xcn;

  const { mutateAsync: withdrawXcn, isLoading: isWithdrawXcnLoading } = useWithdrawXcn();

  const handleWithdraw = async (amountWei: BigNumber) => {
    // Send request to withdraw
    const res = await withdrawXcn({
      accountAddress: account?.address || '',
      amount: amountWei,
    });

    // Close modal
    handleClose();

    return res;
  };

  return (
    <ActionModal
      title={t('withdrawModal.title', { tokenSymbol: withdrawToken.symbol })}
      token={withdrawToken}
      handleClose={handleClose}
      availableTokensWei={stakedBalance || new BigNumber(0)}
      isInitialLoading={false}
      onSubmit={handleWithdraw}
      isSubmitting={isWithdrawXcnLoading}
      connectWalletMessage={t('withdrawModal.connectWalletMessage', {
        tokenSymbol: withdrawToken.symbol,
      })}
      availableTokensLabel={t('withdrawModal.availableTokensLabel', {
        tokenSymbol: withdrawToken.symbol,
      })}
      submitButtonLabel={t('withdrawModal.submitButtonLabel')}
      submitButtonDisabledLabel={t('withdrawModal.submitButtonDisabledLabel')}
      successfulTransactionTitle={t('withdrawModal.successfulTransactionModal.title')}
      successfulTransactionDescription={t('withdrawModal.successfulTransactionModal.description')}
    />
  );
};

export default WithdrawModal;
