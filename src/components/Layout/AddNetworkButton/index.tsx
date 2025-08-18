/** @jsxImportSource @emotion/react */
import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'translation';

import xcn from 'assets/img/xcnLogoPureB.svg';
import { addOnyxNetwork } from 'components/Layout/AddNetworkButton/onyxChainUtils';

import { ButtonProps, SecondaryButton } from '../../Button';

export const AddNetworkButton: React.FC<ButtonProps> = ({ css, ...props }) => {
  const { t } = useTranslation();

  return (
    <SecondaryButton onClick={addOnyxNetwork} variant="secondaryConnectWallet" {...props}>
      <Box css={css}>
        <img src={xcn} alt="XCN" style={{ width: 20, height: 20, marginRight: 8 }} />
        {t('addNetworkButton.title')}
      </Box>
    </SecondaryButton>
  );
};

export default AddNetworkButton;
