import { QueryObserverOptions, useQuery } from 'react-query';

import getDailyXcn, { GetDailyXcnInput, IGetDailyXcnOutput } from 'clients/api/queries/getDailyXcn';
import { useXcnLensContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  IGetDailyXcnOutput,
  Error,
  IGetDailyXcnOutput,
  IGetDailyXcnOutput,
  [FunctionKey.GET_O_TOKEN_DAILY_XCN, Omit<GetDailyXcnInput, 'xcnLensContract'>]
>;

const useGetDailyXcn = (params: Omit<GetDailyXcnInput, 'xcnLensContract'>, options?: Options) => {
  const xcnLensContract = useXcnLensContract();

  return useQuery(
    [FunctionKey.GET_O_TOKEN_DAILY_XCN, params],
    () => getDailyXcn({ accountAddress: params.accountAddress, xcnLensContract }),
    options,
  );
};
export default useGetDailyXcn;
