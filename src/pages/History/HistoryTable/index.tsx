/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { EllipseAddress, Table, TableProps, TokenIcon } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Transaction } from 'types';
import {
  convertWeiToTokens,
  generateEthScanUrl,
  getOTokenByAddress,
  unsafelyGetToken,
} from 'utilities';

import PLACEHOLDER_KEY from 'constants/placeholderKey';
import { TOKENS } from 'constants/tokens';

import { useStyles } from './styles';

export interface HistoryTableProps {
  transactions: Transaction[];
  isFetching: boolean;
}

export const HistoryTableUi: React.FC<HistoryTableProps> = ({ transactions, isFetching }) => {
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

  const eventTranslationKeys = {
    All: t('history.all'),
    Approval: t('history.approval'),
    Supply: t('history.supply'),
    Redeem: t('history.redeem'),
    Borrow: t('history.borrow'),
    RepayBorrow: t('history.repayBorrow'),
    LiquidateBorrow: t('history.liquidateBorrow'),
    Transfer: t('history.transfer'),
    ReservesAdded: t('history.reservesAdded'),
    ReservesReduced: t('history.reservesReduced'),
    Stake: t('history.stake'),
    Withdraw: t('history.withdraw'),
    Claim: t('history.claim'),
    Propose: t('history.propose'),
    Vote: t('history.vote'),
  };

  // Format transactions to rows
  const rows: TableProps['data'] = useMemo(
    () =>
      transactions.map(txn => {
        const oToken = getOTokenByAddress(txn.oTokenAddress);
        const token = (oToken && unsafelyGetToken(oToken.id)) || TOKENS.xcn;

        return [
          {
            key: 'id',
            render: () => <Typography variant="small2">{txn.id}</Typography>,
            value: txn.id,
            align: 'left',
          },
          {
            key: 'type',
            render: () => (
              <>
                <div css={[styles.whiteText, styles.table, styles.typeCol]}>
                  <TokenIcon token={token} css={styles.icon} />
                  <Typography variant="small2" color="textPrimary">
                    {eventTranslationKeys[txn.event]}
                  </Typography>
                </div>
                <div css={[styles.cards, styles.cardTitle]}>
                  <div css={styles.typeCol}>
                    <TokenIcon token={token} css={styles.icon} />
                    <Typography variant="small2" color="textPrimary">
                      {txn.event}
                    </Typography>
                  </div>
                  <Typography variant="small2">{txn.id}</Typography>
                </div>
              </>
            ),
            value: txn.event,
            align: 'left',
          },
          {
            key: 'txnHash',
            render: () => (
              <Typography
                component="a"
                href={generateEthScanUrl(txn.txHash, 'tx')}
                target="_blank"
                rel="noreferrer"
                variant="small2"
                css={styles.txnHashText}
              >
                <EllipseAddress address={txn.txHash} />
              </Typography>
            ),
            value: txn.txHash,
            align: 'left',
          },
          {
            key: 'block',
            render: () => (
              <Typography variant="small2" color="textPrimary">
                {txn.blockNumber}
              </Typography>
            ),
            value: txn.blockNumber,
            align: 'left',
          },
          {
            key: 'from',
            render: () => (
              <Typography
                component="a"
                href={generateEthScanUrl(txn.from, 'address')}
                target="_blank"
                rel="noreferrer"
                variant="small2"
                css={styles.txnHashText}
              >
                <EllipseAddress address={txn.from} />
              </Typography>
            ),
            value: txn.from,
            align: 'left',
          },
          {
            key: 'to',
            render: () =>
              txn.to ? (
                <Typography
                  component="a"
                  href={generateEthScanUrl(txn.to, 'address')}
                  target="_blank"
                  rel="noreferrer"
                  variant="small2"
                  css={styles.txnHashText}
                >
                  <EllipseAddress address={txn.to} />
                </Typography>
              ) : (
                PLACEHOLDER_KEY
              ),
            value: txn.to,
            align: 'left',
          },
          {
            key: 'amount',
            render: () => (
              <Typography variant="small2" css={styles.whiteText}>
                {convertWeiToTokens({
                  valueWei: txn.amountWei,
                  token,
                  returnInReadableFormat: true,
                  minimizeDecimals: true,
                  addSymbol: false,
                })}
              </Typography>
            ),
            value: txn.amountWei.toFixed(),
            align: 'right',
          },
          {
            key: 'created',
            render: () => (
              <Typography variant="small2" css={styles.whiteText}>
                {t('history.createdAt', { date: txn.createdAt })}
              </Typography>
            ),
            value: txn.createdAt.getTime(),
            align: 'right',
          },
        ];
      }),
    [JSON.stringify(transactions)],
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

const HistoryTable: React.FC<HistoryTableProps> = ({ transactions, isFetching }) => (
  <HistoryTableUi transactions={transactions} isFetching={isFetching} />
);

export default HistoryTable;
