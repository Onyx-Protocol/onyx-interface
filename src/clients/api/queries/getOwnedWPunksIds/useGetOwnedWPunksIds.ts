import { useQuery } from 'react-query';
import { useMulticall } from 'clients/web3';
import { useWPunksContract } from 'clients/contracts/hooks';
import getOwnedWPunksIds from 'clients/api/queries/getOwnedWPunksIds';
import FunctionKey from 'constants/functionKey';

const useGetOwnedWPunksIds = (params: any, options?: any) => {
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
