import { VError } from 'errors';
import { restService } from 'utilities';

export interface VerifySignatureInput {
  signedMessage: string;
  signature: string;
  address: string;
}

const verifySignature = async ({ signedMessage, signature, address }: VerifySignatureInput) => {
  const response = await restService<unknown>({
    endpoint: '/users/verify-signature',
    method: 'POST',
    params: {
      signedMessage,
      signature,
      address,
    },
    apiPoint: true,
  });

  // @todo Add specific api error handling
  if ('result' in response && response.result === 'error') {
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
      data: { message: response.message },
    });
  }

  return true;
};

export default verifySignature;
