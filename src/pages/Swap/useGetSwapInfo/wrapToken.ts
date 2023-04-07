import { Token } from 'types';

import { UNISWAP_TOKENS } from 'constants/tokens';

// UniSwap only trades with wrapped tokens, so ETH is replaced with wETH
const wrapToken = (token: Token) => (token.isNative ? UNISWAP_TOKENS.weth : token);

export default wrapToken;
