/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { EllipseAddress, Table, TableProps, TokenIcon } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import {
  convertWeiToTokens,
  generateEthScanUrl,
  getOTokenByAddress,
  unsafelyGetToken,
} from 'utilities';

import PLACEHOLDER_KEY from 'constants/placeholderKey';
import { TOKENS } from 'constants/tokens';
import { HistoryItem } from 'utilities/getHistorySubGraph';

import { useStyles } from './styles';

export interface HistoryTableProps {
  historyItems: HistoryItem[];
  isFetching: boolean;
}

export const HistoryTableUi: React.FC<HistoryTableProps> = ({ historyItems, isFetching }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const columns = useMemo(
    () => [
      { key: 'id', label: t('history.columns.id'), orderable: true, align: 'left' },
      { key: 'type', label: t('history.columns.type'), orderable: true, align: 'left' },
      { key: 'txnHash', label: t('history.columns.txnHash'), orderable: true, align: 'left' },
      { key: 'block', label: t('history.columns.block'), orderable: true, align: 'left' },
      { key: 'from', label: t('history.columns.from'), orderable: true, align: 'left' },
      { key: 'to', label: t('history.columns.to'), orderable: true, align: 'left' },
      { key: 'amount', label: t('history.columns.amount'), orderable: true, align: 'right' },
      { key: 'created', label: t('history.columns.created'), orderable: true, align: 'right' },
    ],
    [],
  );

  const cardColumns = useMemo(() => {
    // Copy columns to order them for mobile
    const newColumns = [...columns];
    // Remove id column, mobile title is handled by type component
    newColumns.shift();
    // Place account as the third position on the top row
    const [amountCol] = newColumns.splice(5, 1);
    newColumns.splice(3, 0, amountCol);
    return newColumns;
  }, [columns]);

  const typeTranslationKeys = {
    all: t('history.all'),
    approval: t('history.approval'),
    supply: t('history.supply'),
    redeem: t('history.redeem'),
    borrow: t('history.borrow'),
    repayBorrow: t('history.repayBorrow'),
    liquidateBorrow: t('history.liquidateBorrow'),
    transfer: t('history.transfer'),
    reservesAdded: t('history.reservesAdded'),
    reservesReduced: t('history.reservesReduced'),
    stake: t('history.stake'),
    withdraw: t('history.withdraw'),
    claim: t('history.claim'),
    propose: t('history.propose'),
    vote: t('history.vote'),
  };

  // Format transactions to rows
  const rows: TableProps['data'] = useMemo(
    () =>
      historyItems.map(historyItem => {
        const oToken = getOTokenByAddress(historyItem.to);
        const token = (oToken && unsafelyGetToken(oToken.id)) || TOKENS.xcn;

        return [
          {
            key: 'id',
            render: () => <Typography variant="small2">{historyItem.id}</Typography>,
            value: historyItem.id,
            align: 'left',
          },
          {
            key: 'type',
            render: () => (
              <>
                <div css={[styles.whiteText, styles.table, styles.typeCol]}>
                  <TokenIcon token={token} css={styles.icon} />
                  <Typography variant="small2" color="textPrimary">
                    {typeTranslationKeys[historyItem.type]}
                  </Typography>
                </div>
                <div css={[styles.cards, styles.cardTitle]}>
                  <div css={styles.typeCol}>
                    <TokenIcon token={token} css={styles.icon} />
                    <Typography variant="small2" color="textPrimary">
                      {historyItem.type.charAt(0).toUpperCase() + historyItem.type.slice(1)}
                    </Typography>
                  </div>
                  <Typography variant="small2">{historyItem.id}</Typography>
                </div>
              </>
            ),
            value: historyItem.type,
            align: 'left',
          },
          {
            key: 'txnHash',
            render: () => (
              <Typography
                component="a"
                href={generateEthScanUrl(historyItem.transactionHash, 'tx')}
                target="_blank"
                rel="noreferrer"
                variant="small2"
                css={styles.txnHashText}
              >
                <EllipseAddress address={historyItem.transactionHash} />
              </Typography>
            ),
            value: historyItem.transactionHash,
            align: 'left',
          },
          {
            key: 'block',
            render: () => (
              <Typography variant="small2" color="textPrimary">
                {historyItem.blockNumber}
              </Typography>
            ),
            value: historyItem.blockNumber,
            align: 'left',
          },
          {
            key: 'from',
            render: () => (
              <Typography
                component="a"
                href={generateEthScanUrl(historyItem.from, 'address')}
                target="_blank"
                rel="noreferrer"
                variant="small2"
                css={styles.txnHashText}
              >
                <EllipseAddress address={historyItem.from} />
              </Typography>
            ),
            value: historyItem.from,
            align: 'left',
          },
          {
            key: 'to',
            render: () =>
              historyItem.to ? (
                <Typography
                  component="a"
                  href={generateEthScanUrl(historyItem.to, 'address')}
                  target="_blank"
                  rel="noreferrer"
                  variant="small2"
                  css={styles.txnHashText}
                >
                  <EllipseAddress address={historyItem.to} />
                </Typography>
              ) : (
                PLACEHOLDER_KEY
              ),
            value: historyItem.to,
            align: 'left',
          },
          {
            key: 'amount',
            render: () => (
              <Typography variant="small2" css={styles.whiteText}>
                {convertWeiToTokens({
                  valueWei: new BigNumber(historyItem.amount),
                  token,
                  returnInReadableFormat: true,
                  minimizeDecimals: true,
                  addSymbol: false,
                })}
              </Typography>
            ),
            value: Number(historyItem.amount).toFixed(),
            align: 'right',
          },
          {
            key: 'created',
            render: () => (
              <Typography variant="small2" css={styles.whiteText}>
                {t('history.createdAt', { date: new Date(+historyItem.blockTimestamp * 1000) })}
              </Typography>
            ),
            value: new Date(+historyItem.blockTimestamp * 1000).getTime(),
            align: 'right',
          },
        ];
      }),
    [JSON.stringify(historyItems)],
  );

  return (
    <Table
      columns={columns}
      cardColumns={cardColumns}
      data={rows}
      initialOrder={{
        orderBy: 'created',
        orderDirection: 'desc',
      }}
      rowKeyIndex={0}
      tableCss={styles.table}
      cardsCss={styles.cards}
      css={styles.cardContentGrid}
      isFetching={isFetching}
    />
  );
};

const HistoryTable: React.FC<HistoryTableProps> = ({ historyItems, isFetching }) => (
  <HistoryTableUi historyItems={historyItems} isFetching={isFetching} />
);

export default HistoryTable;
