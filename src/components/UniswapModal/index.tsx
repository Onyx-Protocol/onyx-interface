import React from 'react';

import { Modal, ModalProps } from '../Modal';

export interface UniswapModalProps {
  isOpen: boolean;
  onClose: ModalProps['handleClose'];
  url: string;
}

const UniswapModal: React.FC<UniswapModalProps> = ({ isOpen, onClose, url }) => (
  <Modal
    className="uniswap-modal"
    isOpen={isOpen}
    handleClose={onClose}
    noHorizontalPadding
    uniswapModal
  >
    <iframe
      title="uniswap_frame"
      src={url}
      height="660px"
      width="100%"
      style={{
        border: '0',
        margin: '0 auto',
        display: 'block',
        borderRadius: '10px',
        maxWidth: '960px',
        minWidth: '300px',
      }}
    />
  </Modal>
);

export default UniswapModal;
