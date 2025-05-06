import { GetSignedMessageResponse } from './types';

const formatSignedMessageResponse = (data: GetSignedMessageResponse) => ({
  signedMessage: `Please sign to confirm the ownership of the wallet.\nNonce: ${data.nonce}\nTimestamp: ${data.timestamp}`,
});

export default formatSignedMessageResponse;
