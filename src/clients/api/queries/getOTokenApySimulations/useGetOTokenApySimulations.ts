import BigNumber from 'bignumber.js';
import { QueryObserverOptions, useQuery } from 'react-query';

import getOTokenApySimulations, {
  GetOTokenApySimulationsOutput,
} from 'clients/api/queries/getOTokenApySimulations';
import useGetOTokenInterestRateModel from 'clients/api/queries/getOTokenInterestRateModel/useGetOTokenInterestRateModel';
import { useMulticall } from 'clients/web3';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetOTokenApySimulationsOutput,
  Error,
  GetOTokenApySimulationsOutput,
  GetOTokenApySimulationsOutput,
  [FunctionKey.GET_O_TOKEN_APY_SIMULATIONS, string]
>;

const useGetOTokenApySimulations = (
  { oTokenId, reserveFactorMantissa }: { oTokenId: string; reserveFactorMantissa?: BigNumber },
  options?: Options,
) => {
  const multicall = useMulticall();
  const { data: interestRateModelData } = useGetOTokenInterestRateModel({ oTokenId });

  return useQuery(
    [FunctionKey.GET_O_TOKEN_APY_SIMULATIONS, oTokenId],
    () =>
      getOTokenApySimulations({
        multicall,
        reserveFactorMantissa: reserveFactorMantissa || new BigNumber(0),
        interestRateModelContractAddress: interestRateModelData?.contractAddress || '',
      }),
    {
      ...options,
      enabled:
        (options?.enabled === undefined || options?.enabled) &&
        interestRateModelData?.contractAddress !== undefined &&
        reserveFactorMantissa !== undefined,
    },
  );
};

export default useGetOTokenApySimulations;
