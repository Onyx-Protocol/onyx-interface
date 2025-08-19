import { BscConnector } from '@binance-chain/bsc-connector';
import { InfinityWalletConnector } from '@infinitywallet/infinity-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import config, { WALLET_SUPPORTED_CHAIN_IDS } from 'config';
import { WalletChainIds } from 'types';

import { getRpcUrlsByChainId } from 'constants/wallet-chains';

import { Connector } from './types';
import { WalletConnectV2Connector } from './walletconnectV2';

export const FILTERED_OUT_WALLETS = ['Trust Wallet', 'Coinbase Wallet', 'WalletConnect'];

export const injectedConnector = new InjectedConnector({
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
});

const trustWalletConnector = new InjectedConnector({
  supportedChainIds: [WalletChainIds.MAINNET],
});

const rpcMap = getRpcUrlsByChainId();
rpcMap[WalletChainIds.TESTNET] = 'https://goerli.infura.io/v3/54af4f71d6c44e0ea83badb0886458f9';

const walletConnectConnector = new WalletConnectV2Connector({
  supportedChainIds: [WalletChainIds.MAINNET],
  rpcMap,
  chains: [WalletChainIds.MAINNET],
  qrcode: true,
});

const binanceChainWalletConnector = new BscConnector({
  supportedChainIds: [WalletChainIds.BSC],
});

const coinbaseWalletConnector = new WalletLinkConnector({
  url: config.rpcUrl,
  appName: 'Onyx',
  supportedChainIds: [WalletChainIds.MAINNET],
});

const infinityWalletConnector = new InfinityWalletConnector({
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
});

export const connectorsByName = {
  [Connector.MetaMask]: injectedConnector,
  [Connector.BraveWallet]: injectedConnector,
  [Connector.WalletConnect]: walletConnectConnector,
  [Connector.CoinbaseWallet]: coinbaseWalletConnector,
  [Connector.TrustWallet]: trustWalletConnector,
  [Connector.BinanceChainWallet]: binanceChainWalletConnector,
  [Connector.InfinityWallet]: infinityWalletConnector,
  [Connector.OperaWallet]: injectedConnector,
  [Connector.BitKeep]: injectedConnector,
  [Connector.Browser]: injectedConnector,
  [Connector.Onyx]: injectedConnector,
};
