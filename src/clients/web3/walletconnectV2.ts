import WalletConnectProvider, { EthereumProvider } from '@walletconnect/ethereum-provider';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';

export const URI_AVAILABLE = 'URI_AVAILABLE';
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID ?? '';

declare type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;

export interface WalletConnectConnectorArguments {
  rpcMap: Record<string, string>;
  supportedChainIds?: number[];
  qrcode: boolean;
  chains: ArrayOneOrMore<number>;
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

function getSupportedChains({
  supportedChainIds,
  rpcMap,
}: WalletConnectConnectorArguments): number[] | undefined {
  if (supportedChainIds) {
    return supportedChainIds;
  }

  return rpcMap ? Object.keys(rpcMap).map(k => Number(k)) : undefined;
}

export class WalletConnectV2Connector extends AbstractConnector {
  public walletConnectProvider?: WalletConnectProvider;

  private readonly config: WalletConnectConnectorArguments;

  constructor(config: WalletConnectConnectorArguments) {
    super({ supportedChainIds: getSupportedChains(config) });
    this.config = config;

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleDisplayUri = this.handleDisplayUri.bind(this);
  }

  private handleDisplayUri(uri: string): void {
    this.emit(URI_AVAILABLE, uri);
  }

  private handleChainChanged(chainId: number | string): void {
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.emitUpdate({ account: accounts[0] });
  }

  private handleDisconnect(): void {
    // we have to do this because of a @walletconnect/web3-provider bug
    if (this.walletConnectProvider) {
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      this.walletConnectProvider = undefined;
    }
    this.emitDeactivate();
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.walletConnectProvider) {
      this.walletConnectProvider = await EthereumProvider.init({
        projectId: PROJECT_ID,
        chains: this.config.chains,
        showQrModal: this.config.qrcode,
        rpcMap: this.config.rpcMap,
      });
    }

    // ensure that the uri is going to be available, and emit an event if there's a new uri
    if (!this.walletConnectProvider.connected) {
      await this.walletConnectProvider.connect({
        chains: [1],
        rpcMap: this.config.rpcMap,
      });
    }

    const account: string = await new Promise<string>((resolve, reject) => {
      const userReject = () => {
        // Erase the provider manually
        this.walletConnectProvider = undefined;
        reject(new UserRejectedRequestError());
      };

      // Workaround to bubble up the error when user reject the connection
      this?.walletConnectProvider?.on('disconnect', () => {
        // Check provider has not been enabled to prevent this event callback from being called in the future
        if (!account) {
          userReject();
        }
      });

      this?.walletConnectProvider
        ?.enable()
        .then((accounts: string[]) => resolve(accounts[0]))
        .catch((error: Error): void => {
          // TODO ideally this would be a better check
          if (error.message === 'User closed modal') {
            userReject();
            return;
          }
          reject(error);
        });
    }).catch(err => {
      throw err;
    });

    this.walletConnectProvider.on('disconnect', this.handleDisconnect);
    this.walletConnectProvider.on('chainChanged', this.handleChainChanged);
    this.walletConnectProvider.on('accountsChanged', this.handleAccountsChanged);
    this.walletConnectProvider.on('display_uri', this.handleDisplayUri);

    return { provider: this.walletConnectProvider, account };
  }

  public async getProvider() {
    return this.walletConnectProvider;
  }

  public async getChainId(): Promise<number | string> {
    return Promise.resolve(this.walletConnectProvider!.chainId);
  }

  public async getAccount(): Promise<null | string> {
    return Promise.resolve(this.walletConnectProvider!.accounts).then(
      (accounts: string[]): string => accounts[0],
    );
  }

  public deactivate() {
    if (this.walletConnectProvider) {
      this.walletConnectProvider.removeListener('disconnect', this.handleDisconnect);
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      this.walletConnectProvider.disconnect();
    }
  }

  public async close() {
    this.emitDeactivate();
  }
}
