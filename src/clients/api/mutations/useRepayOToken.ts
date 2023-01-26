import { MutationObserverOptions } from 'react-query';

import {
  RepayEthInput,
  RepayEthOutput,
  RepayNonEthOTokenInput,
  RepayNonEthOTokenOutput,
  useRepayEth,
  useRepayNonEthOToken,
} from 'clients/api';

type Options = MutationObserverOptions<
  RepayEthOutput | RepayNonEthOTokenOutput,
  Error,
  Omit<RepayNonEthOTokenInput, 'oTokenContract'> | Omit<RepayEthInput, 'web3'>
>;

const useRepayOToken = ({ oTokenId }: { oTokenId: string }, options?: Options) => {
  const useRepayNonEthOTokenResult = useRepayNonEthOToken(
    { oTokenId: oTokenId as Exclude<string, 'eth'> },
    options,
  );
  const useRepayEthResult = useRepayEth(options);

  return oTokenId === 'eth' ? useRepayEthResult : useRepayNonEthOTokenResult;
};

export default useRepayOToken;
