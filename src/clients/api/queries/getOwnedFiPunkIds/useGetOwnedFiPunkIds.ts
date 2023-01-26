import { useQuery } from 'react-query';
import { useMulticall } from 'clients/web3';
import { useFiPunkContract } from 'clients/contracts/hooks';
import getOwnedFiPunkIds from 'clients/api/queries/getOwnedFiPunkIds';
import FunctionKey from 'constants/functionKey';

const useGetOwnedFiPunkIds = (params: any, options?: any) => {
  const multicall = useMulticall();
  const fiPunkContract = useFiPunkContract();

  return useQuery(
    [FunctionKey.GET_OWNED_FIPUNK_IDS, params],
    () => getOwnedFiPunkIds({ accountAddress: params.accountAddress, fiPunkContract, multicall }),
    {
      keepPreviousData: true,
      refetchInterval: 30000,
      ...options,
    },
  );
};
export default useGetOwnedFiPunkIds;
