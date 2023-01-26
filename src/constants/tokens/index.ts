import config from 'config';

import { MAINNET_TOKENS } from './common/mainnet';
import { TESTNET_TOKENS } from './common/testnet';
import { MAINNET_OETH_TOKENS } from './oEth/mainnet';
import { TESTNET_OETH_TOKENS } from './oEth/testnet';

export * from './common/mainnet';
export * from './common/testnet';
export * from './oEth/testnet';
export * from './oEth/testnet';

export const TOKENS = config.isOnTestnet ? TESTNET_TOKENS : MAINNET_TOKENS;

export const OETH_TOKENS = config.isOnTestnet ? TESTNET_OETH_TOKENS : MAINNET_OETH_TOKENS;
