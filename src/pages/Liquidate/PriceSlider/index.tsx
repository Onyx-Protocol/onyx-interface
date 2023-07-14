/* eslint-disable no-nested-ternary */

/** @jsxImportSource @emotion/react */
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Market } from 'types';

import { MAINNET_TOKENS } from 'constants/tokens';

import { useStyles } from './styles';

type Props = {
  markets: Market[];
};

const PriceSlider = ({ markets = [] }: Props) => {
  const styles = useStyles();

  return (
    <div css={styles.slideWrapper}>
      <Marquee gradient={false}>
        {(markets || [])
          .sort((a, b) => a.underlyingDecimal - b.underlyingDecimal)
          .map(cToken => (
            <div className="priceCard" key={cToken.id}>
              <img
                src={MAINNET_TOKENS[cToken.id as keyof typeof MAINNET_TOKENS].asset}
                alt={cToken.underlyingSymbol}
              />
              <div>
                <div className="symbol">{cToken.underlyingSymbol}</div>
                <div className="price">
                  {`$${
                    cToken.underlyingSymbol === 'SHIB'
                      ? cToken.tokenPrice.toFormat(6)
                      : cToken.underlyingSymbol === 'XCN'
                      ? cToken.tokenPrice.toFormat(4)
                      : cToken.tokenPrice.toFormat(3)
                  }`}
                  {cToken.underlyingDecimal === 0
                    ? `(${markets.find(market => market.id === cToken.id)?.cash})`
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
