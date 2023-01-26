import { QueryClient } from 'react-query';
import { Token } from 'types';

import FunctionKey from 'constants/functionKey';

import type { UseGetIsApprovedForAllQueryKey } from './useGetIsApprovedForAll';

const setCachedNftTokenAllowanceToTrue = ({
  queryClient,
  token,
  spenderAddress,
  accountAddress,
}: {
  queryClient: QueryClient;
  token: Token;
  spenderAddress: string;
  accountAddress: string;
}) => {
  const queryKey: UseGetIsApprovedForAllQueryKey = [
    FunctionKey.GET_NFT_ALLOWANCE,
    {
      tokenAddress: token.address,
      spenderAddress,
      accountAddress,
    },
  ];

  queryClient.setQueryData(queryKey, true);
};

export default setCachedNftTokenAllowanceToTrue;
