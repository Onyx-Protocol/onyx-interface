import { useMutation } from 'react-query';

import { liquidateWithSingleRepay } from 'clients/api';
import { useLiquidationProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useLiquidateWithSingleRepay = (
  // TODO: use custom error type https://app.clickup.com/t/2rvwhnt
  options?: any,
) => {
  const liquidationProxyContract = useLiquidationProxyContract();

  return useMutation(
    [FunctionKey.LIQUIDATE_WITH_SINGLE_REPAY_V2, {}],
    (params: any) =>
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
