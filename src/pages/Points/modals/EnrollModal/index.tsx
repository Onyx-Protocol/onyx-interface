/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { getContractAddress } from 'utilities';

import { Farm, getAddress } from 'clients/api';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface StakeModalProps extends Pick<ActionModalProps, 'handleClose'> {
  farm: Farm;
}

const EnrollModal: React.FC<StakeModalProps> = ({ farm, handleClose }) => {
  const { t } = useTranslation();

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

  return (
    <ActionModal
      title={t('enrollModal.title', { tokenSymbol: stakeToken.symbol })}
      token1={stakeToken}
      token2={farm.token}
      handleClose={handleClose}
      isInitialLoading={false}
      connectWalletMessage={t('enrollModal.connectWalletMessage', {
        tokenSymbol: stakeToken.symbol,
      })}
      enableTokenMessage={t('enrollModal.enableTokenMessage', { tokenSymbol: stakeToken.symbol })}
      spenderAddress={spenderAddress}
    />
  );
};

export default EnrollModal;
