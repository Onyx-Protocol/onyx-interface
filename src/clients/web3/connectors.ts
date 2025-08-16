import { BscConnector } from '@binance-chain/bsc-connector';
import { InfinityWalletConnector } from '@infinitywallet/infinity-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import config, { WALLET_SUPPORTED_CHAIN_IDS } from 'config';
import { WalletChainIds } from 'types';

import { Connector } from './types';
import { WalletConnectV2Connector } from './walletconnectV2';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
});

const walletConnectV2Connector = new WalletConnectV2Connector({
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
  rpcMap: {
    [WalletChainIds.MAINNET]: config.rpcUrl,
    [WalletChainIds.TESTNET]: 'https://goerli.infura.io/v3/54af4f71d6c44e0ea83badb0886458f9',
    [WalletChainIds.BSC]: 'https://bscscan.com/',
    [WalletChainIds.BASE]: 'https://basescan.org/',
    [WalletChainIds.ONYX]: 'https://rpc.onyx.org',
  },
  chains: WALLET_SUPPORTED_CHAIN_IDS as [number, ...number[]],
  qrcode: true,
});

const binanceChainWalletConnector = new BscConnector({
  supportedChainIds: [WalletChainIds.BSC],
});

const coinbaseWalletConnector = new WalletLinkConnector({
  url: config.rpcUrl,
  appName: 'Onyx',
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
});

const infinityWalletConnector = new InfinityWalletConnector({
  supportedChainIds: WALLET_SUPPORTED_CHAIN_IDS,
});

export const connectorsByName = {
  [Connector.MetaMask]: injectedConnector,
  [Connector.BraveWallet]: injectedConnector,
  [Connector.WalletConnect]: walletConnectV2Connector,
  [Connector.CoinbaseWallet]: coinbaseWalletConnector,
  [Connector.TrustWallet]: injectedConnector,
  [Connector.BinanceChainWallet]: binanceChainWalletConnector,
  [Connector.InfinityWallet]: infinityWalletConnector,
  [Connector.OperaWallet]: injectedConnector,
  [Connector.BitKeep]: injectedConnector,
  [Connector.Browser]: injectedConnector,
  [Connector.Onyx]: injectedConnector,
};
