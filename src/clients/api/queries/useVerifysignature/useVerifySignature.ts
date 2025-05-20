import { QueryObserverOptions, useQuery } from 'react-query';

import FunctionKey from 'constants/functionKey';

import verifySignature, { VerifySignatureInput } from '.';

type Options = QueryObserverOptions<
  boolean,
  Error,
  boolean,
  boolean,
  [FunctionKey.VERIFY_SIGNATURE, VerifySignatureInput]
>;

const useVerifySignature = (params: VerifySignatureInput, options?: Options) =>
  useQuery([FunctionKey.VERIFY_SIGNATURE, params], () => verifySignature(params), {
    keepPreviousData: true,
    refetchInterval: false,
    ...options,
  });

export default useVerifySignature;
