import { QueryObserverOptions, useQuery } from 'react-query';

import getOTokenInterestRateModel, {
  GetOTokenInterestRateModelOutput,
} from 'clients/api/queries/getOTokenInterestRateModel';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetOTokenInterestRateModelOutput,
  Error,
  GetOTokenInterestRateModelOutput,
  GetOTokenInterestRateModelOutput,
  [FunctionKey.GET_O_TOKEN_INTEREST_RATE_MODEL, string]
>;

const useGetOTokenInterestRateModel = ({ oTokenId }: { oTokenId: string }, options?: Options) => {
  const oTokenContract = useOTokenContract(oTokenId);

  return useQuery(
    [FunctionKey.GET_O_TOKEN_INTEREST_RATE_MODEL, oTokenId],
    () => getOTokenInterestRateModel({ oTokenContract }),
    options,
  );
};

export default useGetOTokenInterestRateModel;
