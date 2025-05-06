/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';

import ActionModal, { ActionModalProps } from '../ActionModal';

export interface StakeModalProps extends Pick<ActionModalProps, 'handleClose'> {
  handleClose: () => void;
}

const EnrollModal: React.FC<StakeModalProps> = ({ handleClose }) => {
  const { t } = useTranslation();

  return (
    <ActionModal
      title={t('enrollModal.title')}
      handleClose={handleClose}
      isInitialLoading={false}
      connectWalletMessage={t('enrollModal.connectWalletMessage')}
    />
  );
};

export default EnrollModal;
