import { useMutation } from 'react-query';

import { liquidateBorrow } from 'clients/api';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useLiquidateBorrow = (
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  { oTokenId }: { oTokenId: string },
  options?: any,
) => {
  if (!oTokenId) return { mutateAsync: null, isLoading: false };
  const oTokenContract = useOTokenContract(oTokenId);

  return useMutation(
    [FunctionKey.LIQUIDATE_BORROW, {}],
    (params: any) =>
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
