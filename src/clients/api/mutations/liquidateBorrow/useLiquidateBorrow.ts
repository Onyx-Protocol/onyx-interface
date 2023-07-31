import { UseMutationOptions, useMutation } from 'react-query';
import type { TransactionReceipt } from 'web3-core/types';

import { liquidateBorrow } from 'clients/api';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { OEth20, OEthToken } from 'types/contracts';

type UseLiquidateBorrowParams = {
  isNativeToken: boolean;
  borrower: string;
  oTokenCollateralAddress: string;
  repayAmount: string;
  accountAddress: string;
};

const useLiquidateBorrow = (
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  { oTokenId }: { oTokenId: string },
  options?: UseMutationOptions<TransactionReceipt | null, unknown, UseLiquidateBorrowParams>,
) => {
  if (!oTokenId) return { mutateAsync: null, isLoading: false };
  const oTokenContract: OEth20 | OEthToken = useOTokenContract(oTokenId);

  return useMutation(
    [FunctionKey.LIQUIDATE_BORROW, {}],
    (params: UseLiquidateBorrowParams) =>
      liquidateBorrow({
        oTokenContract,
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

export default useLiquidateBorrow;
