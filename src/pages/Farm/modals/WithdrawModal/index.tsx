/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';

import { Farm, getAddress, useWithdrawFromFarm } from 'clients/api';
import { AuthContext } from 'context/AuthContext';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface WithdrawModalProps extends Pick<ActionModalProps, 'handleClose'> {
  farm: Farm;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ farm, handleClose }) => {
  const { t } = useTranslation();
  const { account } = useContext(AuthContext);

  const withdrawToken: Token = React.useMemo(
    () => ({
      id: farm.lpSymbol,
      symbol: farm.lpSymbol,
      decimals: 18,
      address: getAddress(farm.lpAddresses),
      asset: '',
    }),
    [farm.lpSymbol],
  );

  const { mutateAsync: withdraw, isLoading: isWithdrawLoading } = useWithdrawFromFarm();

  const handleWithdraw = async (amountWei: BigNumber) => {
    // Send request to withdraw
    const res = await withdraw({
      fromAccountAddress: account?.address || '',
      pid: farm.pid,
      amountWei,
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
      availableTokensWei={farm.userData?.stakedBalance || new BigNumber(0)}
      isInitialLoading={false}
      onSubmit={handleWithdraw}
      isSubmitting={isWithdrawLoading}
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
