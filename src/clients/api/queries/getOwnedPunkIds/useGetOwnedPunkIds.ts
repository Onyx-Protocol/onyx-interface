import { useQuery } from 'react-query';

import getOwnedPunkIds from 'clients/api/queries/getOwnedPunkIds';
import { useMulticall } from 'clients/web3';
import FunctionKey from 'constants/functionKey';

const useGetOwnedPunkIds = (
  params: { accountAddress: string },
  options?: Record<string, unknown>,
) => {
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
