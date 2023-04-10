import { Token } from 'types';

import { TESTNET_TOKENS } from '../common/testnet';

const { bayc, wpunks, ...rest } = TESTNET_TOKENS;

export const TESTNET_UNISWAP_TOKENS = {
  ...rest,
  weth: {
    id: 'weth',
    symbol: 'WETH',
    decimals: 18,
    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    asset:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  } as Token,
};
