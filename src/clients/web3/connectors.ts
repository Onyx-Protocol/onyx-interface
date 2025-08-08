import { BscConnector } from '@binance-chain/bsc-connector';
import { InfinityWalletConnector } from '@infinitywallet/infinity-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import config from 'config';
import { EthChainId } from 'types';

import { Connector } from './types';
import { WalletConnectV2Connector } from './walletconnectV2';

export const injectedConnector = new InjectedConnector({ supportedChainIds: [config.chainId] });

const walletConnectV2Connector = new WalletConnectV2Connector({
  supportedChainIds: [EthChainId.MAINNET],
  rpcMap: { [EthChainId.MAINNET]: config.rpcUrl },
  chains: [EthChainId.MAINNET],
  qrcode: true,
});

const binanceChainWalletConnector = new BscConnector({ supportedChainIds: [config.chainId] });

const coinbaseWalletConnector = new WalletLinkConnector({
  url: config.rpcUrl,
  appName: 'Onyx',
  supportedChainIds: [config.chainId],
});

const infinityWalletConnector = new InfinityWalletConnector({
  supportedChainIds: [EthChainId.MAINNET],
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
};
