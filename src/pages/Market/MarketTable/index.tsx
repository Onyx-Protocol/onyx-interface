/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { LayeredValues, Table, TableProps, TokenIconWithSymbol } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Market } from 'types';
import {
  convertPercentageFromSmartContract,
  formatCentsToReadableValue,
  formatToReadablePercentage,
  formatTokensToReadableValue,
  unsafelyGetToken,
} from 'utilities';

import { useGetMarkets } from 'clients/api';

import { useStyles as useSharedStyles } from '../styles';
import { useStyles as useLocalStyles } from './styles';

export interface MarketTableProps extends Pick<TableProps, 'getRowHref'> {
  markets: Market[];
}

export const MarketTableUi: React.FC<MarketTableProps> = ({ markets, getRowHref }) => {
  const { t } = useTranslation();
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();

  const columns = useMemo(
    () => [
      { key: 'asset', label: t('market.columns.asset'), orderable: false, align: 'left' },
      {
        key: 'totalSupply',
        label: t('market.columns.totalSupply'),
        orderable: true,
        align: 'right',
      },
      { key: 'supplyApy', label: t('market.columns.supplyApy'), orderable: true, align: 'right' },
      {
        key: 'totalBorrows',
        label: t('market.columns.totalBorrow'),
        orderable: true,
        align: 'right',
      },
      { key: 'borrowApy', label: t('market.columns.borrowApy'), orderable: true, align: 'right' },
      { key: 'liquidity', label: t('market.columns.liquidity'), orderable: true, align: 'right' },
      {
        key: 'collateralFactor',
        label: t('market.columns.collateralFactor'),
        orderable: true,
        align: 'right',
      },
      { key: 'price', label: t('market.columns.price'), orderable: true, align: 'right' },
    ],
    [],
  );

  const cardColumns = useMemo(() => {
    const newColumns = [...columns];
    const [liquidityCol] = newColumns.splice(5, 1);
    newColumns.splice(3, 0, liquidityCol);
    return newColumns;
  }, [columns]);

  // Format markets to rows
  const rows: TableProps['data'] = useMemo(
    () =>
      markets.map(market => [
        {
          key: 'asset',
          render: () => (
            <TokenIconWithSymbol token={unsafelyGetToken(market.id)} css={localStyles.whiteText} />
          ),
          value: market.id,
        },
        {
          key: 'totalSupply',
          render: () => (
            <LayeredValues
              topValue={formatCentsToReadableValue({
                value: market.treasuryTotalSupplyCents,
                shortenLargeValue: true,
              })}
              bottomValue={formatTokensToReadableValue({
                value: market.treasuryTotalSupplyCents.div(market.tokenPrice.times(100)),
                token: unsafelyGetToken(market.id),
                minimizeDecimals: true,
                shortenLargeValue: true,
              })}
              css={localStyles.noWrap}
            />
          ),
          align: 'right',
          value: market.treasuryTotalSupplyCents.toFixed(),
        },
        {
          key: 'supplyApy',
          render: () => (
            <LayeredValues
              topValue={
                market.supplyXcnApy.isNaN()
                  ? 'Pending'
                  : formatToReadablePercentage(market.supplyApy.plus(market.supplyXcnApy))
              }
              bottomValue={
                market.supplyXcnApy.isNaN()
                  ? 'Pending'
                  : formatToReadablePercentage(market.supplyXcnApy)
              }
            />
          ),
          value: market.supplyApy.plus(market.supplyXcnApy).toFixed(),
          align: 'right',
        },
        {
          key: 'totalBorrows',
          render: () => (
            <LayeredValues
              topValue={formatCentsToReadableValue({
                value: market.treasuryTotalBorrowsCents,
                shortenLargeValue: true,
              })}
              bottomValue={formatTokensToReadableValue({
                value: market.treasuryTotalBorrowsCents.div(market.tokenPrice.times(100)),
                token: unsafelyGetToken(market.id),
                minimizeDecimals: true,
                shortenLargeValue: true,
              })}
              css={localStyles.noWrap}
            />
          ),
          value: market.treasuryTotalBorrowsCents.toFixed(),
          align: 'right',
        },
        {
          key: 'borrowApy',
          render: () => (
            <LayeredValues
              topValue={
                market.borrowXcnApy.isNaN()
                  ? 'Pending'
                  : formatToReadablePercentage(market.borrowXcnApy.minus(market.borrowApy))
              }
              bottomValue={
                market.borrowXcnApy.isNaN()
                  ? 'Pending'
                  : formatToReadablePercentage(market.borrowXcnApy)
              }
            />
          ),
          value: market.borrowApy.plus(market.borrowXcnApy).toFixed(),
          align: 'right',
        },
        {
          key: 'liquidity',
          render: () => (
            <Typography variant="small1" css={localStyles.whiteText}>
              {formatCentsToReadableValue({
                value: market.liquidity.multipliedBy(100),
                shortenLargeValue: true,
              })}
            </Typography>
          ),
          value: market.liquidity.toFixed(),
          align: 'right',
        },
        {
          key: 'collateralFactor',
          render: () => (
            <Typography variant="small1" css={localStyles.whiteText}>
              {formatToReadablePercentage(
                convertPercentageFromSmartContract(market.collateralFactor),
              )}
            </Typography>
          ),
          value: market.collateralFactor,
          align: 'right',
        },
        {
          key: 'price',
          render: () => (
            <Typography variant="small1" css={localStyles.whiteText}>
              {formatCentsToReadableValue({ value: market.tokenPrice.multipliedBy(100) })}
            </Typography>
          ),
          align: 'right',
          value: market.tokenPrice.toFixed(),
        },
      ]),
    [JSON.stringify(markets)],
  );

  return (
    <Table
      columns={columns}
      cardColumns={cardColumns}
      data={rows}
      initialOrder={{
        orderBy: 'asset',
        orderDirection: 'desc',
      }}
      rowKeyIndex={0}
      getRowHref={getRowHref}
      tableCss={sharedStyles.table}
      cardsCss={sharedStyles.cards}
      css={localStyles.cardContentGrid}
    />
  );
};

const MarketTable = () => {
  const { data: { markets } = { markets: [], dailyXcnWei: undefined } } = useGetMarkets({
    placeholderData: { markets: [], dailyXcnWei: undefined },
  });
  return <MarketTableUi markets={markets} getRowHref={row => `/market/${row[0].value}`} />;
};

export default MarketTable;
