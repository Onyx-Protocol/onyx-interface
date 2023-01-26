import { useMutation } from 'react-query';

import { approveNftForAll, queryClient } from 'clients/api';
import { useNftContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import setCachedNftTokenAllowanceToTrue from '../../queries/getIsApprovedForAll/setCachedNftTokenAllowanceToTrue';

const useApproveNftForAll = (
  { token, spenderAddress, accountAddress }: any,
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: any,
) => {
  const tokenContract = useNftContract(token);

  return useMutation(
    [FunctionKey.APPROVE_NFT_TOKEN, { token }],
    () =>
      approveNftForAll({
        tokenContract,
        accountAddress,
        spenderAddress,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        setCachedNftTokenAllowanceToTrue({ queryClient, token, spenderAddress, accountAddress });
        queryClient.invalidateQueries([
          FunctionKey.GET_NFT_ALLOWANCE,
          {
            tokenAddress: token.address,
            spenderAddress,
            accountAddress,
          },
        ]);
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useApproveNftForAll;
