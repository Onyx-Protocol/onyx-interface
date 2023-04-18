/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { getContractAddress } from 'utilities';

import { Farm, getAddress, useStakeInFarm } from 'clients/api';
import { AuthContext } from 'context/AuthContext';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface StakeModalProps extends Pick<ActionModalProps, 'handleClose'> {
  farm: Farm;
}

const StakeModal: React.FC<StakeModalProps> = ({ farm, handleClose }) => {
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

  const spenderAddress = getContractAddress('masterChef');

  const { mutateAsync: stakeInFarm, isLoading: isStakeLoading } = useStakeInFarm();

  const handleStake = async (amountWei: BigNumber) => {
    // Send request to stake
    const res = await stakeInFarm({
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
      title={t('stakeModal.title', { tokenSymbol: stakeToken.symbol })}
      token={stakeToken}
      token1={farm.token}
      token2={farm.quoteToken}
      handleClose={handleClose}
      availableTokensWei={farm.userData?.tokenBalance || new BigNumber(0)}
      isInitialLoading={false}
      onSubmit={handleStake}
      isSubmitting={isStakeLoading}
      connectWalletMessage={t('stakeModal.connectWalletMessage', {
        tokenSymbol: stakeToken.symbol,
      })}
      tokenNeedsToBeEnabled
      enableTokenMessage={t('stakeModal.enableTokenMessage', { tokenSymbol: stakeToken.symbol })}
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
