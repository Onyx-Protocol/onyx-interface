import { useQuery } from 'react-query';

import getIsApprovedForAll from 'clients/api/queries/getIsApprovedForAll';
import { useNftContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

export type UseGetIsApprovedForAllQueryKey = [
  FunctionKey.GET_NFT_ALLOWANCE,
  {
    tokenAddress: string;
    spenderAddress: string;
    accountAddress: string;
  },
];

const useGetIsApprovedForAll = ({ token, spenderAddress, accountAddress }: any, options?: any) => {
  if (token.decimals !== 0) return false;
  const tokenContract = useNftContract(token);

  return useQuery(
    [
      FunctionKey.GET_NFT_ALLOWANCE,
      {
        tokenAddress: token.address,
        spenderAddress,
        accountAddress,
      },
    ],
    () =>
      getIsApprovedForAll({
        tokenContract,
        spenderAddress,
        accountAddress,
      }),
    options,
  );
};

export default useGetIsApprovedForAll;
