import { useQuery } from 'react-query';

import getOwnedWPunksIds from 'clients/api/queries/getOwnedWPunksIds';
import { useWPunksContract } from 'clients/contracts/hooks';
import { useMulticall } from 'clients/web3';
import FunctionKey from 'constants/functionKey';

const useGetOwnedWPunksIds = (params: { accountAddress: string }, options?: object) => {
  const multicall = useMulticall();
  const WPunksContract = useWPunksContract();

  return useQuery(
    [FunctionKey.GET_OWNED_WPUNKS_IDS, params],
    () => getOwnedWPunksIds({ accountAddress: params.accountAddress, WPunksContract, multicall }),
    {
      keepPreviousData: true,
      refetchInterval: 30000,
      ...options,
    },
  );
};
export default useGetOwnedWPunksIds;
