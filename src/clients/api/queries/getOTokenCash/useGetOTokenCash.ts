import { QueryObserverOptions, useQuery } from 'react-query';

import getOTokenCash, { GetOTokenCashOutput } from 'clients/api/queries/getOTokenCash';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetOTokenCashOutput,
  Error,
  GetOTokenCashOutput,
  GetOTokenCashOutput,
  [FunctionKey.GET_O_TOKEN_CASH, string]
>;

const useGetOTokenCash = ({ oTokenId }: { oTokenId: string }, options?: Options) => {
  const oTokenContract = useOTokenContract(oTokenId);

  return useQuery(
    [FunctionKey.GET_O_TOKEN_CASH, oTokenId],
    () => getOTokenCash({ oTokenContract }),
    options,
  );
};

export default useGetOTokenCash;
