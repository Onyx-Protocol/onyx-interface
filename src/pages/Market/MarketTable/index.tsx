/* eslint-disable no-nested-ternary */

/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import {
  Icon,
  LayeredValues,
  Table,
  TableProps,
  Toggle,
  ToggleProps,
  TokenIconWithSymbol,
  Tooltip,
} from 'components';
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

  const [isXcnEnabled, setIsXcnEnabled] = React.useState(true);

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
      markets.map(market => {
        const supplyApy = isXcnEnabled
          ? market.supplyXcnApy.plus(market.supplyApy)
          : market.supplyApy;
        const borrowApy = isXcnEnabled
          ? market.borrowXcnApy.minus(market.borrowApy)
          : market.borrowApy.times(-1);

        return [
          {
            key: 'asset',
            render: () => (
              <TokenIconWithSymbol
                token={unsafelyGetToken(market.id)}
                css={localStyles.whiteText}
              />
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
            render: () =>
              market.supplyXcnApy.isNaN() ? (
                'Pending'
              ) : (
                <span style={{ color: '#18DF8B' }}>{formatToReadablePercentage(supplyApy)}</span>
              ),
            value: supplyApy.toNumber(),
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
            render: () =>
              market.borrowXcnApy.isNaN() ? (
                'Pending'
              ) : (
                <span style={{ color: borrowApy.gt(0) ? '#18DF8B' : '#E93D44' }}>
                  {formatToReadablePercentage(borrowApy)}
                </span>
              ),
            value: borrowApy.toNumber(),
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
                ${market.underlyingSymbol === 'SHIB'
                  ? market.tokenPrice.toFormat(6)
                  : market.underlyingSymbol === 'XCN'
                  ? market.tokenPrice.toFormat(4)
                  : market.tokenPrice.toFormat(2)}
                {/* {formatCentsToReadableValue({ value: market.tokenPrice.multipliedBy(100) })} */}
              </Typography>
            ),
            align: 'right',
            value: market.tokenPrice.toFixed(),
          },
        ];
      }),
    [JSON.stringify(markets), isXcnEnabled],
  );

  const handleXcnToggleChange: ToggleProps['onChange'] = (_event, checked) =>
    setIsXcnEnabled(checked);

  return (
    <>
      <div css={localStyles.apyWithXcn}>
        <Tooltip css={localStyles.tooltip} title={t('myAccount.apyWithXcnTooltip')}>
          <Icon css={localStyles.infoIcon} name="info" />
        </Tooltip>

        <Typography
          color="text.primary"
          variant="small1"
          component="span"
          css={localStyles.apyWithXcnLabel}
        >
          {t('myAccount.apyWithXcn')}
        </Typography>

        <Toggle css={localStyles.toggle} value={isXcnEnabled} onChange={handleXcnToggleChange} />
      </div>

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
    </>
  );
};

const MarketTable = () => {
  const { data: { markets } = { markets: [], dailyXcnWei: undefined } } = useGetMarkets({
    placeholderData: { markets: [], dailyXcnWei: undefined },
  });
  return <MarketTableUi markets={markets} getRowHref={row => `/market/${row[0].value}`} />;
};

export default MarketTable;
