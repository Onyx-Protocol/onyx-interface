/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { Modal, ModalProps } from 'components';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import { convertTokensToWei } from 'utilities';

import { useWithdrawXcn } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AmountFormProps } from 'containers/AmountForm';
import { AuthContext } from 'context/AuthContext';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';

import { useStyles } from '../styles';
import WithdrawForm from './WithdrawForm';

export interface WithdrawUiProps {
  className?: string;
  isOpen: boolean;
  onClose: ModalProps['handleClose'];
  balance?: BigNumber;
}

export interface WithdrawProps {
  onSubmitWithdraw: AmountFormProps['onSubmit'];
  isWithdrawLoading: boolean;
}

/**
 * The fade effect on this component results in that it is still rendered after the asset has been set to undefined
 * when closing the modal.
 */
export const WithdrawUi: React.FC<WithdrawUiProps & WithdrawProps> = ({
  className,
  onClose,
  balance = new BigNumber(0),
  onSubmitWithdraw,
  isWithdrawLoading,
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
      <WithdrawForm
        onSubmit={onSubmit}
        inputLabel={inputLabel}
        maxInput={balance.div(1e18)}
        calculateNewBalance={calculateNewBalance}
        isTransactionLoading={isTransactionLoading}
      />
    </div>
  );

  return (
    <Modal isOpen={isOpen} handleClose={onClose} title={t('stakeWithdraw.withdraw')}>
      {renderTabContent({
        inputLabel: t('stakeWithdraw.withdrawableAmount'),
        calculateNewBalance: (initial: BigNumber, amount: BigNumber) => initial.minus(amount),
        isTransactionLoading: isWithdrawLoading,
        onSubmit: onSubmitWithdraw,
      })}
    </Modal>
  );
};

const WithdrawModal: React.FC<WithdrawUiProps> = props => {
  const { isOpen, balance, onClose } = props;
  const { account: { address: accountAddress = '' } = {} } = useContext(AuthContext);

  const { t } = useTranslation();
  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const { mutateAsync: withdrawXcn, isLoading: isWithdrawXcnLoading } = useWithdrawXcn();

  const onSubmitWithdraw: AmountFormProps['onSubmit'] = async value => {
    const stakeAmountWei = convertTokensToWei({ value: new BigNumber(value), token: TOKENS.xcn });
    const res = await withdrawXcn({
      accountAddress,
      amount: stakeAmountWei,
    });
    onClose();

    openSuccessfulTransactionModal({
      title: t('stakeWithdraw.successfulWithdrawTransactionModal.title'),
      content: t('stakeWithdraw.successfulWithdrawTransactionModal.message'),
      amount: {
        valueWei: stakeAmountWei,
        token: TOKENS.xcn,
      },
      transactionHash: res.transactionHash,
    });
  };

  return (
    <WithdrawUi
      isOpen={isOpen}
      balance={balance}
      onClose={onClose}
      onSubmitWithdraw={onSubmitWithdraw}
      isWithdrawLoading={isWithdrawXcnLoading}
    />
  );
};

export default WithdrawModal;
