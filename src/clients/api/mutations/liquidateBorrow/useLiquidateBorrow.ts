import { useMutation } from 'react-query';

import { liquidateBorrow } from 'clients/api';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { OEth20, OEthToken } from 'types/contracts';

const useLiquidateBorrow = (
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  { oTokenId }: { oTokenId: string },
  options?: any,
) => {
  if (!oTokenId) return { mutateAsync: null, isLoading: false };
  const oTokenContract: OEth20 | OEthToken = useOTokenContract(oTokenId);

  return useMutation(
    [FunctionKey.LIQUIDATE_BORROW, {}],
    (params: {
      isNativeToken: boolean;
      borrower: string;
      oTokenCollateralAddress: string;
      repayAmount: string;
      accountAddress: string;
    }) =>
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
