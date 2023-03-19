import { Token } from 'types';

import { OETH_TOKENS } from 'constants/tokens';

const getOTokenByAddress = (address: string) => {
  let token: Token | undefined;

  Object.keys(OETH_TOKENS)
    .filter(key => Object.prototype.hasOwnProperty.call(OETH_TOKENS, key))
    .forEach(tokenId => {
      const currentToken = OETH_TOKENS[tokenId as keyof typeof OETH_TOKENS];
      if (currentToken?.address.toLowerCase() === address?.toLowerCase()) {
        token = currentToken;
      }
    });

  return token;
};

export default getOTokenByAddress;
