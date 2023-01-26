import { QueryObserverOptions, useQuery } from 'react-query';

import getOTokenBalancesAll, {
  GetOTokenBalancesAllInput,
  IGetOTokenBalancesAllOutput,
} from 'clients/api/queries/getOTokenBalancesAll';
import { useXcnLensContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  IGetOTokenBalancesAllOutput,
  Error,
  IGetOTokenBalancesAllOutput,
  IGetOTokenBalancesAllOutput,
  [FunctionKey.GET_O_TOKEN_BALANCES_ALL, Omit<GetOTokenBalancesAllInput, 'xcnLensContract'>]
>;

const useGetOTokenBalancesAll = (
  { account, oTokenAddresses }: Omit<GetOTokenBalancesAllInput, 'xcnLensContract'>,
  options?: Options,
) => {
  const xcnLensContract = useXcnLensContract();
  return useQuery(
    [FunctionKey.GET_O_TOKEN_BALANCES_ALL, { account, oTokenAddresses }],
    () => getOTokenBalancesAll({ xcnLensContract, account, oTokenAddresses }),
    options,
  );
};

export default useGetOTokenBalancesAll;
