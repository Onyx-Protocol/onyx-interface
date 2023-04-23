import { Eth20, OEth20, OEthToken, OTokenEx, XcnToken } from 'types/contracts';

export type TokenContract<T extends string = ''> = T extends 'xcn' ? XcnToken : Eth20;

export type OTokenContract<T extends string> = T extends 'eth'
  ? OEthToken
  : T extends 'wpunks'
  ? OTokenEx
  : T extends 'bayc'
  ? OTokenEx
  : T extends 'mayc'
  ? OTokenEx
  : OEth20;
