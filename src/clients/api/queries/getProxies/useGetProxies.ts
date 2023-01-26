import { useQuery } from 'react-query';

import getProxies from 'clients/api/queries/getProxies';
import { useFiPunkContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useGetProxies = (params: any, options?: any) => {
  const fiPunkContract = useFiPunkContract();

  return useQuery(
    [FunctionKey.GET_PROXIES, params],
    () => getProxies({ accountAddress: params.accountAddress, fiPunkContract }),
    {
      keepPreviousData: true,
      refetchInterval: 3000,
      ...options,
    },
  );
};
export default useGetProxies;
