import { useQuery } from 'react-query';
import { useMulticall } from 'clients/web3';

import getOwnedPunkIds from 'clients/api/queries/getOwnedPunkIds';
import FunctionKey from 'constants/functionKey';

const useGetOwnedPunkIds = (params: any, options?: any) => {
  const multicall = useMulticall();

  return useQuery(
    [FunctionKey.GET_OWNED_PUNK_IDS, params],
    () => getOwnedPunkIds({ accountAddress: params.accountAddress, multicall }),
    {
      keepPreviousData: true,
      // refetchInterval: 30000,
      ...options,
    },
  );
};
export default useGetOwnedPunkIds;
