import { MutationObserverOptions } from 'react-query';
import { Asset } from 'types';

import {
  SupplyEthInput,
  SupplyEthOutput,
  SupplyEthParams,
  SupplyNonEthInput,
  SupplyNonEthOutput,
  SupplyNonEthParams,
  useSupplyEth,
  useSupplyNonEth,
} from 'clients/api';

interface UseSupplyArgs {
  asset: Asset;
  account: string;
}

type OptionsSupplyEth = MutationObserverOptions<SupplyEthOutput, Error, SupplyEthParams>;
type OptionsSupplyNonEth = MutationObserverOptions<SupplyNonEthOutput, Error, SupplyNonEthParams>;

export type UseSupplyParams =
  | Omit<SupplyNonEthInput, 'tokenContract' | 'assetId' | 'account'>
  | Omit<SupplyEthInput, 'tokenContract' | 'assetId' | 'account'>;

const useSupply = (
  { asset, account }: UseSupplyArgs,
  options?: OptionsSupplyEth | OptionsSupplyNonEth,
) => {
  const useSupplyNonEthResult = useSupplyNonEth(
    {
      assetId: asset?.token.id,
      account,
    },
    options as OptionsSupplyNonEth,
  );

  const useSupplyEthResult = useSupplyEth({ account }, options as OptionsSupplyEth);

  return asset.token.isNative ? useSupplyEthResult : useSupplyNonEthResult;
};

export default useSupply;
