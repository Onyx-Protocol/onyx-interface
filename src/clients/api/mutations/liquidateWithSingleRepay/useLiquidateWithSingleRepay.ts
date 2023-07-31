import { UseMutationOptions, useMutation } from 'react-query';
import type { TransactionReceipt } from 'web3-core';

import { liquidateWithSingleRepay } from 'clients/api';
import { useLiquidationProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type UseLiquidateWithSingleRepayParams = {
  isNativeToken: boolean;
  borrower: string;
  oTokenCollateralAddress: string;
  oTokenRepayAddress: string;
  repayAmount: string;
  seizeIndexes: (string | number)[];
  isClaimOToken: boolean;
  accountAddress: string;
};

const useLiquidateWithSingleRepay = (
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: UseMutationOptions<
    TransactionReceipt | null,
    unknown,
    UseLiquidateWithSingleRepayParams
  >,
) => {
  const liquidationProxyContract = useLiquidationProxyContract();

  return useMutation(
    [FunctionKey.LIQUIDATE_WITH_SINGLE_REPAY_V2, {}],
    (params: UseLiquidateWithSingleRepayParams) =>
      liquidateWithSingleRepay({
        liquidationProxyContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useLiquidateWithSingleRepay;
