import { MutationObserverOptions, useMutation } from 'react-query';

import supplyEth, { SupplyEthInput, SupplyEthOutput } from 'clients/api/mutations/supplyEth';
import queryClient from 'clients/api/queryClient';
import { useOTokenContract } from 'clients/contracts/hooks';
import { useWeb3 } from 'clients/web3';
import FunctionKey from 'constants/functionKey';
import { OEthToken } from 'types/contracts';

export type SupplyEthParams = Omit<SupplyEthInput, 'tokenContract' | 'account' | 'web3'>;

const useSupplyEth = (
  { account }: { account: string },
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: MutationObserverOptions<SupplyEthOutput, Error, SupplyEthParams>,
) => {
  const oEthContract = useOTokenContract<'eth'>('eth');
  const web3 = useWeb3();
  return useMutation(
    FunctionKey.SUPPLY_ETH,
    params =>
      supplyEth({
        tokenContract: oEthContract as OEthToken,
        web3,
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
            oTokenId: 'eth',
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

export default useSupplyEth;
