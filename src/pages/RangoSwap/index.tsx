/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import { Widget, WidgetConfig } from '@rango-dev/widget-embedded';
import { ConnectWallet } from 'components';
import config from 'config';
import React from 'react';
import { useTranslation } from 'translation';

import { useStyles } from './styles';

const RangoSwapPageUi: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const rangoConfig: WidgetConfig = {
    apiKey: config.rangoSwapApiKey,
    theme: {
      mode: 'dark',
      colors: {
        light: {},
        dark: {
          foreground: '#ffffff',
          background: '#1f242c',
          surface: '#383944',
          primary: '#1eb9a6',
          neutral: '#282931',
          success: '#1eb9a6',
        },
      },
    },
  };

  return (
    <Paper css={styles.container}>
      <ConnectWallet message={t('swapPage.connectWalletToSwap')}>
        <Widget config={rangoConfig} />
      </ConnectWallet>
    </Paper>
  );
};

const RangoSwapPage: React.FC = () => <RangoSwapPageUi />;

export default RangoSwapPage;
