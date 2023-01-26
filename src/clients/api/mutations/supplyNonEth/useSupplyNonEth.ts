import { MutationObserverOptions, useMutation } from 'react-query';

import supply, { SupplyNonEthInput, SupplyNonEthOutput } from 'clients/api/mutations/supplyNonEth';
import queryClient from 'clients/api/queryClient';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { OEth20 } from 'types/contracts';

export type SupplyNonEthParams = Omit<SupplyNonEthInput, 'tokenContract' | 'account'>;

const useSupply = (
  { assetId, account }: { assetId: string; account: string },
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: MutationObserverOptions<SupplyNonEthOutput, Error, SupplyNonEthParams>,
) => {
  const tokenContract = useOTokenContract<string>(assetId);

  return useMutation(
    [FunctionKey.SUPPLY, assetId],
    params =>
      supply({
        tokenContract: tokenContract as OEth20,
        account,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        queryClient.invalidateQueries(FunctionKey.GET_O_TOKEN_BALANCES_ALL);
        queryClient.invalidateQueries([
          FunctionKey.GET_O_TOKEN_BALANCE,
          {
            accountAddress: account,
            oTokenId: assetId,
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

export default useSupply;
