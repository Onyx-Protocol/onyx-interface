/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React from 'react';
import { formatCentsToReadableValue } from 'utilities';

import { useStyles } from './styles';

const UserTokenTable = ({ token, markets = [], selectedToken, onSelectSupplyToken }: any) => {
  const styles = useStyles();
  const supply = new BigNumber(token.oTokenBalance).times(token.market.exchangeRate);
  const borrow = new BigNumber(token.storedBorrowBalance);
  if (supply.isZero() && (token.market.underlyingDecimals === 0 || borrow.isZero())) {
    return null;
  }

  const getTokenPrice = (tokenTemp: any) =>
    (markets || []).find((market: any) => market.address === tokenTemp.market.id)?.tokenPrice ||
    new BigNumber(0);

  return (
    <tr
      css={[
        styles.token,
        token.market.underlyingDecimals > 0 ? styles.noAllowed : '',
        selectedToken?.market?.id === token.market.id ? styles.activeToken : '',
      ]}
      onClick={() => {
        if (token.market.underlyingDecimals === 0) {
          onSelectSupplyToken(token);
        }
      }}
    >
      <td>
        <span className="usdPrice">
          {(markets || []).find((market: any) => market.address === token.market.id)
            ?.underlyingSymbol || ''}
        </span>
      </td>
      <td>
        <span>
          {supply.dp(2, 1).toString(10)} (
          {formatCentsToReadableValue({
            value: new BigNumber(supply).multipliedBy(getTokenPrice(token)).multipliedBy(100),
            shortenLargeValue: true,
          })}
          )
        </span>
      </td>
      {token.market.underlyingDecimals !== 0 ? (
        <td>
          <span className="usdPrice">
            {borrow.dp(2, 1).toString(10)} (
            {formatCentsToReadableValue({
              value: new BigNumber(borrow).multipliedBy(getTokenPrice(token)).multipliedBy(100),
              shortenLargeValue: true,
            })}
            )
          </span>
        </td>
      ) : (
        <td />
      )}
    </tr>
  );
};

export default UserTokenTable;
