import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import config from 'config';
import { VError, formatVErrorToReadableString } from 'errors';
import { useCallback, useState } from 'react';

import { detectProvider } from 'clients/web3/walletDetectionUtils';
import { toast } from 'components/Toast';
import { LS_KEY_CONNECTED_CONNECTOR } from 'constants/localStorageKeys';

import { connectorsByName } from '../connectors';
import { Connector } from '../types';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectV2Connector,
} from '../walletconnectV2';
import setupNetwork from './setUpNetwork';

const ONYX_CHAIN_ID = 80888;

const getConnectedConnector = (): Connector | undefined => {
  const lsConnectedConnector = window.localStorage.getItem(LS_KEY_CONNECTED_CONNECTOR);

  return lsConnectedConnector &&
    Object.values(Connector).includes(lsConnectedConnector as Connector)
    ? (lsConnectedConnector as Connector)
    : undefined;
};

const useAuth = () => {
  const { activate, deactivate, account, chainId } = useWeb3React();
  const [connectedConnector, setConnectedConnector] = useState(getConnectedConnector());

  const switchToEthereum = async () => {
    if (!window.ethereum) return false;

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${config.chainId.toString(16)}` }],
    });
    return true;
  };

  const login = useCallback(
    async (connectorID: Connector) => {
      if (connectorID === Connector.Browser) {
        const provider = await detectProvider(5000);

        if (!provider) {
          throw new VError({ type: 'interaction', code: 'noProvider' });
        }
      }

      const connector = connectorsByName[connectorID];

      if (!connector) {
        throw new VError({ type: 'interaction', code: 'unsupportedWallet' });
      }

      try {
        await activate(connector, undefined, true);

        // After successful connection, check if we're on Onyx chain
        if (window.ethereum) {
          // If on Onyx chain, prompt to switch to Ethereum
          if (chainId === ONYX_CHAIN_ID) {
            console.log('Connected on Onyx chain, switching to Ethereum...');

            toast.info({
              message: 'Switching to Ethereum network...',
            });

            const switched = await switchToEthereum();

            if (!switched) {
              toast.warning({
                message: 'Please switch to Ethereum network in your wallet',
              });
            }
          }
        }

        // Mark user as logged in
        window.localStorage.setItem(LS_KEY_CONNECTED_CONNECTOR, connectorID);
        setConnectedConnector(connectorID);
      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            await activate(connector);
          }
          return;
        }

        // Reset wallet connect provider if user denied access to their account
        if (
          (error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect) &&
          connector instanceof WalletConnectV2Connector
        ) {
          connector.walletConnectProvider = undefined;
        }

        // Display error message
        let errorMessage;

        if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          throw new VError({ type: 'interaction', code: 'authorizeAccess' });
        } else if (
          error instanceof NoEthereumProviderError ||
          error instanceof NoBscProviderError
        ) {
          throw new VError({ type: 'interaction', code: 'noProvider' });
        } else {
          errorMessage = (error as Error).message;
        }

        toast.error({ message: errorMessage });
      }
    },
    [activate],
  );

  const loginShowToast = async (connectorID: Connector) => {
    try {
      await login(connectorID);
    } catch (error) {
      let { message } = error as Error;

      if (error instanceof VError) {
        message = formatVErrorToReadableString(error);
      }

      toast.error({
        message,
      });
    }
  };

  const logOut = useCallback(() => {
    deactivate();
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName[Connector.WalletConnect].close();
      connectorsByName[Connector.WalletConnect].walletConnectProvider = undefined;
    }

    window.localStorage.removeItem(LS_KEY_CONNECTED_CONNECTOR);
    setConnectedConnector(undefined);
  }, [deactivate]);

  return { login: loginShowToast, logOut, accountAddress: account, connectedConnector };
};

export default useAuth;
