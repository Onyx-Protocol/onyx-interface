import React from 'react';
import { useTranslation } from 'translation';

import { Modal, ModalProps } from '../Modal';
import { AccountDetails, AccountDetailsProps } from './AccountDetails';
import { WalletList, WalletListProps } from './WalletList';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: ModalProps['handleClose'];
  onLogin: WalletListProps['onLogin'];
  onLogOut: AccountDetailsProps['onLogOut'];
  onCopyAccountAddress: AccountDetailsProps['onCopyAccountAddress'];
  account?: AccountDetailsProps['account'];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onLogOut,
  onCopyAccountAddress,
  account,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      className="xcn-modal"
      isOpen={isOpen}
      handleClose={onClose}
      noHorizontalPadding={!account}
      narrow={!account}
      title={account ? <h4>{t('authModal.title.yourWallet')}</h4> : undefined}
    >
      {!account ? (
        <WalletList onLogin={onLogin} />
      ) : (
        <AccountDetails
          account={account}
          onCopyAccountAddress={onCopyAccountAddress}
          onLogOut={onLogOut}
        />
      )}
    </Modal>
  );
};
