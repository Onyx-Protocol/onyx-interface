import { useMutation } from 'react-query';

import supplyNFT from 'clients/api/mutations/supplyNFT';
import queryClient from 'clients/api/queryClient';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { OEth20 } from 'types/contracts';

const useSupplyNFT = (
  { oTokenId, accountAddress }: { oTokenId: string; accountAddress: string },
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: any,
) => {
  const tokenContract = useOTokenContract(oTokenId);

  return useMutation(
    FunctionKey.SUPPLY_NFT,
    (params: any) =>
      supplyNFT({
        tokenContract: tokenContract as OEth20,
        accountAddress,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        queryClient.invalidateQueries(FunctionKey.GET_O_TOKEN_BALANCES_ALL);
        queryClient.invalidateQueries([
          FunctionKey.GET_O_TOKEN_BALANCE,
          {
            accountAddress,
            oTokenId,
          },
        ]);
        queryClient.invalidateQueries(FunctionKey.GET_ASSETS_IN_ACCOUNT);
        queryClient.invalidateQueries(FunctionKey.GET_MARKETS);
        queryClient.invalidateQueries(FunctionKey.GET_O_TOKEN_DAILY_XCN);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useSupplyNFT;
