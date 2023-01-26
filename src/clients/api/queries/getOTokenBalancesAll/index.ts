import { XcnLens } from 'types/contracts';

export interface GetOTokenBalancesAllInput {
  xcnLensContract: XcnLens;
  account: string;
  oTokenAddresses: string[];
}

interface GetOTokenBalancesAllResponse extends Array<string> {
  balanceOf: string;
  balanceOfUnderlying: string;
  borrowBalanceCurrent: string;
  tokenAllowance: string;
  tokenBalance: string;
  oToken: string;
}

interface GetOTokenBalanceOutput {
  balanceOf: string;
  balanceOfUnderlying: string;
  borrowBalanceCurrent: string;
  tokenAllowance: string;
  tokenBalance: string;
  oToken: string;
}

export type IGetOTokenBalancesAllOutput = {
  balances: GetOTokenBalanceOutput[];
};

const getOTokenBalancesAll = async ({
  xcnLensContract,
  oTokenAddresses,
  account,
}: GetOTokenBalancesAllInput): Promise<IGetOTokenBalancesAllOutput> => {
  const response = await xcnLensContract.methods
    .oTokenBalancesAll(oTokenAddresses, account?.toLowerCase())
    .call();
  // This is original returned as an array with these properties but at some
  // point the properties are getting removed from the type
  const balances = (response as unknown as GetOTokenBalancesAllResponse[]).map(item => ({
    balanceOf: item.balanceOf,
    balanceOfUnderlying: item.balanceOfUnderlying,
    borrowBalanceCurrent: item.borrowBalanceCurrent,
    tokenAllowance: item.tokenAllowance,
    tokenBalance: item.tokenBalance,
    oToken: item.oToken,
  }));

  return { balances };
};

export default getOTokenBalancesAll;
