import { FILTERED_OUT_WALLETS } from 'clients/web3/connectors';
import { Connector } from 'clients/web3/types';

export const isRunningInOperaBrowser = () => window.ethereum?.isOpera;

export const isRunningInBinanceChainWallet = () => !!window.BinanceChain;

export const detectInjectedWallet = (): Connector | null => {
  if (!window.ethereum) return null;

  if (window.ethereum.isTrust) return Connector.TrustWallet;
  if (window.ethereum.isMetaMask && !window.ethereum.isBraveWallet) return Connector.MetaMask;
  if (window.ethereum.isBraveWallet) return Connector.BraveWallet;
  if (window.ethereum.isOpera) return Connector.OperaWallet;
  if (window.ethereum.isBitKeep) return Connector.BitKeep;
  if (window.ethereum.isOnyx) return Connector.Onyx;

  return Connector.Browser;
};

export const getActualConnector = (accountConnector?: Connector): Connector | null => {
  if (!accountConnector) return null;

  const injectedConnectors = [
    Connector.MetaMask,
    Connector.BraveWallet,
    Connector.TrustWallet,
    Connector.OperaWallet,
    Connector.BitKeep,
    Connector.Browser,
    Connector.Onyx,
  ];

  const isInjectedConnector = injectedConnectors.includes(accountConnector);

  if (isInjectedConnector) {
    return detectInjectedWallet() || accountConnector;
  }

  return accountConnector;
};

// Quick explanation: due to these wallets not supporting onyx chain, wallet connection gets broken
// and they cannot actually change the change to onyx, so we use this util to hide the chain switching button

export const shouldHideChainSwitching = (walletName?: string): boolean => {
  if (!walletName) return false;

  return FILTERED_OUT_WALLETS.includes(walletName);
};
