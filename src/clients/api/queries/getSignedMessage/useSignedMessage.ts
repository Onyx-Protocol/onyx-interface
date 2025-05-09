import { QueryObserverOptions, useQuery } from 'react-query';

import FunctionKey from 'constants/functionKey';

import getSignedMessage, { GetSignedMessageInput, GetSignedMessageOutput } from '.';

type Options = QueryObserverOptions<
  GetSignedMessageOutput,
  Error,
  GetSignedMessageOutput,
  GetSignedMessageOutput,
  [FunctionKey.GET_SIGNED_MESSSAGE, GetSignedMessageInput]
>;

const useSignedMessage = (params: GetSignedMessageInput = { address: '' }, options?: Options) =>
  // This endpoint is paginated so we keep the previous responses by default to create a more seamless paginating experience
  useQuery([FunctionKey.GET_SIGNED_MESSSAGE, params], () => getSignedMessage(params), {
    keepPreviousData: true,
    refetchInterval: false,
    ...options,
  });

export default useSignedMessage;
