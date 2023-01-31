/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Toggle } from 'components';
import config from 'config';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { getAccountsSubGraph } from 'utilities';

import { useGetMarkets } from 'clients/api';

import CardList from './CardList';
import PriceSlider from './PriceSlider';
import { useStyles } from './styles';

const limit = 100;
let loadFinished = false;
const Liquidate: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { data: { markets } = { markets: [], dailyXcnWei: undefined } } = useGetMarkets({
    placeholderData: { markets: [], dailyXcnWei: undefined },
  });
  const [users, setUsers] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [isLiquidityOnly, setIsLiquidityOnly] = useState(false);

  useEffect(() => {
    loadFinished = false;
    setPage(0);
    setUsers([]);
  }, [isLiquidityOnly]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching ||
      loadFinished
    ) {
      return;
    }
    setIsFetching(true);
  };

  const getTokenPrice = (token: any) =>
    (markets || []).find(market => market.address === token.market.id)?.tokenPrice ||
    new BigNumber(0);

  const fetchData = async () => {
    // setTimeout(async () => {
    const result = await getAccountsSubGraph(config.chainId, page);
    setPage(page + limit);
    setUsers([
      ...users,
      ...result
        .map(user => {
          let totalCash = new BigNumber(0);
          let totalBorrow = new BigNumber(0);
          let minSupply: any; /* for NFT */
          let maxBorrow: any; /* for non-NFT */
          user.tokens.forEach((token: any) => {
            const tokenPrice = getTokenPrice(token);
            if (token.enteredMarket) {
              totalCash = totalCash.plus(
                new BigNumber(token.oTokenBalance)
                  .times(token.market.collateralFactor)
                  .times(token.market.exchangeRate)
                  .times(tokenPrice),
              );
            }
            const borrow = new BigNumber(token.storedBorrowBalance).times(tokenPrice);
            if (token.market.underlyingDecimals === 0) {
              if (
                !new BigNumber(token.oTokenBalance).isZero() &&
                (!minSupply || tokenPrice.toNumber() < minSupply)
              ) {
                minSupply = tokenPrice.toNumber();
              }
            } else if (!borrow.isZero() && (!maxBorrow || borrow.toNumber() > maxBorrow)) {
              maxBorrow = borrow.toNumber();
            }
            totalBorrow = totalBorrow.plus(borrow);
          });
          const borrowPercent = totalCash.gt(0)
            ? (totalBorrow.toNumber() / totalCash.toNumber()) * 100
            : 0;
          return {
            ...user,
            borrowPercent,
            minSupply,
            maxBorrow,
            totalBorrow,
          };
        })
        .filter(
          user =>
            (!isLiquidityOnly || (isLiquidityOnly && user.borrowPercent >= 100)) &&
            user.totalBorrow.isGreaterThan(0),
        ),
    ]);
    setIsFetching(false);
    if (result.length < limit) {
      loadFinished = true;
    }
    // }, 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (users.length < 6 && !loadFinished && markets && markets.length !== 0) {
      fetchData();
    }
  }, [users, markets]);

  useEffect(() => {
    if (!isFetching) return;
    fetchData();
  }, [isFetching]);

  return (
    <div>
      <Typography variant="h4">{t('liquidate.users')}</Typography>
      <PriceSlider markets={markets} />
      <div css={styles.liquidityToggleContainer}>
        <div css={styles.toggleText}>At risk only</div>
        <Toggle
          onChange={() => {
            setIsLiquidityOnly(!isLiquidityOnly);
          }}
          value={isLiquidityOnly}
        />
      </div>
      <CardList
        markets={markets}
        users={users}
        isFetching={isFetching}
        loadFinished={loadFinished}
      />
    </div>
  );
};

export default Liquidate;
