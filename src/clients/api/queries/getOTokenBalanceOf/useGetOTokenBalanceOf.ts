import { QueryObserverOptions, useQuery } from 'react-query';

import getOTokenBalanceOf, {
  GetOTokenBalanceOfInput,
  GetOTokenBalanceOfOutput,
} from 'clients/api/queries/getOTokenBalanceOf';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

interface TrimmedParams extends Omit<GetOTokenBalanceOfInput, 'oTokenContract'> {
  oTokenId: string;
}

type Options = QueryObserverOptions<
  GetOTokenBalanceOfOutput,
  Error,
  GetOTokenBalanceOfOutput,
  GetOTokenBalanceOfOutput,
  [FunctionKey.GET_O_TOKEN_BALANCE, TrimmedParams]
>;

const useGetOTokenBalanceOf = ({ accountAddress, oTokenId }: TrimmedParams, options?: Options) => {
  const oTokenContract = useOTokenContract(oTokenId);

  return useQuery(
    [FunctionKey.GET_O_TOKEN_BALANCE, { accountAddress, oTokenId }],
    () => getOTokenBalanceOf({ oTokenContract, accountAddress }),
    options,
  );
};

export default useGetOTokenBalanceOf;
