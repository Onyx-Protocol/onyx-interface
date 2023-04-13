import { EthChainId } from 'types';

import { TOKENS, UNISWAP_TOKENS } from 'constants/tokens';

import { FarmConfig } from './types';

const farmConfig: FarmConfig[] = [
  {
    pid: 2,
    lpSymbol: 'XCN-WETH LP',
    lpAddresses: {
      [EthChainId.MAINNET]: '0x006Df670C4735A18422B8c75F06d891D67e6B405',
      [EthChainId.TESTNET]: '0x006Df670C4735A18422B8c75F06d891D67e6B405',
    },
    token: TOKENS.xcn,
    quoteToken: UNISWAP_TOKENS.weth,
  },

  {
    pid: 3,
    lpSymbol: 'XCN-USDT LP',
    lpAddresses: {
      [EthChainId.MAINNET]: '0xe346BcA6aDFCA5E6474a43E1d73270E43e80F41e',
      [EthChainId.TESTNET]: '0xe346BcA6aDFCA5E6474a43E1d73270E43e80F41e',
    },
    token: TOKENS.xcn,
    quoteToken: TOKENS.usdt,
  },
];

export default farmConfig;
