/** @jsxImportSource @emotion/react */
import React from 'react';
import Marquee from 'react-fast-marquee';

import { MAINNET_TOKENS } from 'constants/tokens';

import { useStyles } from './styles';

const PriceSlider = ({ markets = [] }: any) => {
  const styles = useStyles();

  return (
    <div css={styles.slideWrapper}>
      <Marquee gradient={false}>
        {(markets || [])
          .sort((a: any, b: any) => a.underlyingDecimal - b.underlyingDecimal)
          .map((cToken: any) => (
            <div className="priceCard" key={cToken.id}>
              <img
                src={MAINNET_TOKENS[cToken.id as keyof typeof MAINNET_TOKENS].asset}
                alt={cToken.underlyingSymbol}
              />
              <div>
                <div className="symbol">{cToken.underlyingSymbol}</div>
                <div className="price">
                  {`$${cToken.tokenPrice.toFormat(3)}`}
                  {cToken.underlyingDecimal === 0
                    ? `(${markets.find((market: any) => market.id === cToken.id)?.cash})`
                    : ''}
                </div>
              </div>
            </div>
          ))}
      </Marquee>
      <div css={styles.overlay} />
    </div>
  );
};

export default PriceSlider;
