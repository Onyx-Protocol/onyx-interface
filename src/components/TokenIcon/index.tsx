/** @jsxImportSource @emotion/react */
import React from 'react';
import { Token } from 'types';

import { useStyles } from './styles';

export interface TokenIconProps {
  token: Token;
  className?: string;
}

export const TokenIcon: React.FC<TokenIconProps> = ({ className, token }) => {
  const styles = useStyles();

  return <img src={token.asset} css={styles.icon} alt={token.symbol} className={className} />;
};

export interface LpTokenIconProps {
  token1?: Token;
  token2?: Token;
  className?: string;
}

export const LpTokenIcon: React.FC<LpTokenIconProps> = ({ className, token1, token2 }) => {
  const styles = useStyles();

  return (
    <div css={styles.lptoken}>
      <img src={token1?.asset} css={styles.icon} alt={token1?.symbol} className={className} />
      <img src={token2?.asset} css={styles.icon} alt={token2?.symbol} className={className} />
    </div>
  );
};
