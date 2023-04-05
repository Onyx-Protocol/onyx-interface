import { Token } from 'types';

import { UNISWAP_TOKENS } from 'constants/tokens';

// PancakeSwap only trades with wrapped tokens, so BNB is replaced with wBNB
const wrapToken = (token: Token) => (token.isNative ? UNISWAP_TOKENS.weth : token);

export default wrapToken;
