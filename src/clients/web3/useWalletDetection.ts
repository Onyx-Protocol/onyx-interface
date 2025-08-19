import React from 'react';

import { Connector } from 'clients/web3';
import { WALLETS } from 'components/AuthModal/constants';

import {
  detectInjectedWallet,
  getActualConnector,
  shouldHideChainSwitching,
} from './walletDetectionUtils';

export const useWalletDetection = (accountConnector?: Connector) => {
  const actualConnector = React.useMemo(
    () => getActualConnector(accountConnector),
    [accountConnector],
  );

  const walletInfo = React.useMemo(
    () => WALLETS.find(wallet => wallet.connector === actualConnector) || WALLETS[0],
    [actualConnector],
  );

  const shouldHideChainSwitch = React.useMemo(
    () => shouldHideChainSwitching(walletInfo.name),
    [walletInfo.name],
  );

  return {
    actualConnector,
    walletName: walletInfo.name,
    walletLogo: walletInfo.Logo,
    shouldHideChainSwitch,
    detectInjectedWallet,
  };
};
