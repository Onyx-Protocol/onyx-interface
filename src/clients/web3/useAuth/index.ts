import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { VError, formatVErrorToReadableString } from 'errors';
import { useCallback, useState } from 'react';
import { EthChainId } from 'types';

import { switchToEth } from 'components/Layout/AddNetworkButton/onyxChainUtils';
import { toast } from 'components/Toast';
import { LS_KEY_CONNECTED_CONNECTOR } from 'constants/localStorageKeys';

import { connectorsByName } from '../connectors';
import { Connector } from '../types';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectV2Connector,
} from '../walletconnectV2';
import setupNetwork from './setUpNetwork';

const getConnectedConnector = (): Connector | undefined => {
  const lsConnectedConnector = window.localStorage.getItem(LS_KEY_CONNECTED_CONNECTOR);

  return lsConnectedConnector &&
    Object.values(Connector).includes(lsConnectedConnector as Connector)
    ? (lsConnectedConnector as Connector)
    : undefined;
};

const useAuth = () => {
  const { activate, deactivate, account } = useWeb3React();
  const [connectedConnector, setConnectedConnector] = useState(getConnectedConnector());

  const login = useCallback(
    async (connectorID: Connector) => {
      const connector = connectorsByName[connectorID];
      if (!connector) {
        throw new VError({ type: 'interaction', code: 'unsupportedWallet' });
      }

      try {
        await activate(connector, undefined, true);

        window.localStorage.setItem(LS_KEY_CONNECTED_CONNECTOR, connectorID);
        setConnectedConnector(connectorID);

        if (window.ethereum) {
          await new Promise(resolve => setTimeout(resolve, 500));

          try {
            const currentChainIdHex = await window.ethereum.request({
              method: 'eth_chainId',
            });

            const currentChainId = parseInt(currentChainIdHex, 16);

            if (currentChainId !== EthChainId.MAINNET) {
              const switched = await switchToEth();

              if (!switched) {
                toast.warning({
                  message: 'Please switch to Onyx network in your wallet',
                });
              }
            }
          } catch (chainError) {
            toast.info({
              message: 'Please ensure you are on the Onyx network',
            });
          }
        }
      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            await activate(connector);
            window.localStorage.setItem(LS_KEY_CONNECTED_CONNECTOR, connectorID);
            setConnectedConnector(connectorID);
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
