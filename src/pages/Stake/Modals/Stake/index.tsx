/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { Modal, ModalProps } from 'components';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { convertTokensToWei } from 'utilities';

import { useStakeXcn } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AmountFormProps } from 'containers/AmountForm';
import { AuthContext } from 'context/AuthContext';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';

import { useStyles } from '../styles';
import StakeForm from './StakeForm';

export interface StakeUiProps {
  className?: string;
  isOpen: boolean;
  onClose: ModalProps['handleClose'];
  balance?: BigNumber;
}

export interface StakeProps {
  onSubmitStake: AmountFormProps['onSubmit'];
  isStakeLoading: boolean;
}

/**
 * The fade effect on this component results in that it is still rendered after the asset has been set to undefined
 * when closing the modal.
 */
export const StakeUi: React.FC<StakeUiProps & StakeProps> = ({
  className,
  onClose,
  balance = new BigNumber(0),
  onSubmitStake,
  isStakeLoading,
  isOpen,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const renderTabContent = ({
    inputLabel,
    calculateNewBalance,
    isTransactionLoading,
    onSubmit,
  }: {
    inputLabel: string;
    calculateNewBalance: (initial: BigNumber, amount: BigNumber) => BigNumber;
    isTransactionLoading: boolean;
    onSubmit: AmountFormProps['onSubmit'];
  }) => (
    <div className={className} css={styles.container}>
      <StakeForm
        onSubmit={onSubmit}
        inputLabel={inputLabel}
        maxInput={balance.div(1e18)}
        calculateNewBalance={calculateNewBalance}
        isTransactionLoading={isTransactionLoading}
      />
    </div>
  );

  return (
    <Modal isOpen={isOpen} handleClose={onClose} title={t('stakeWithdraw.stake')}>
      {renderTabContent({
        inputLabel: t('stakeWithdraw.walletBalance'),
        calculateNewBalance: (initial: BigNumber, amount: BigNumber) => initial.minus(amount),
        isTransactionLoading: isStakeLoading,
        onSubmit: onSubmitStake,
      })}
    </Modal>
  );
};

const StakeModal: React.FC<StakeUiProps> = props => {
  const { isOpen, balance, onClose } = props;
  const { account: { address: accountAddress = '' } = {} } = useContext(AuthContext);

  const { t } = useTranslation();
  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const { mutateAsync: stakeXcn, isLoading: isStakeXcnLoading } = useStakeXcn();

  const onSubmitStake: AmountFormProps['onSubmit'] = async value => {
    const stakeAmountWei = convertTokensToWei({ value: new BigNumber(value), token: TOKENS.xcn });
    const res = await stakeXcn({
      accountAddress,
      amount: stakeAmountWei,
    });
    onClose();

    openSuccessfulTransactionModal({
      title: t('stakeWithdraw.successfulStakeTransactionModal.title'),
      content: t('stakeWithdraw.successfulStakeTransactionModal.message'),
      amount: {
        valueWei: stakeAmountWei,
        token: TOKENS.xcn,
      },
      transactionHash: res.transactionHash,
    });
  };

  return (
    <StakeUi
      isOpen={isOpen}
      balance={balance}
      onClose={onClose}
      onSubmitStake={onSubmitStake}
      isStakeLoading={isStakeXcnLoading}
    />
  );
};

export default StakeModal;
