/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import { Checkbox, Select } from 'components';
import React from 'react';
import { useTranslation } from 'translation';

import { OETH_TOKENS } from 'constants/tokens';
import { HistoryItemType } from 'utilities/getHistorySubGraph';

import { useStyles } from './styles';

export const ALL_VALUE = 'all';

interface AssetRecord {
  label: string;
  value: string;
  image?: string;
}

export interface FilterProps {
  historyItemType: HistoryItemType | typeof ALL_VALUE;
  setHistoryItemType: (historyItemType: HistoryItemType | typeof ALL_VALUE) => void;
  asset: string;
  setAsset: (asset: string) => void;
  showOnlyMyTxns: boolean;
  setShowOnlyMyTxns: (showOnlyMyTxns: boolean) => void;
  walletConnected: boolean;
}

export const Filters: React.FC<FilterProps> = ({
  historyItemType,
  setHistoryItemType,
  asset,
  setAsset,
  showOnlyMyTxns,
  setShowOnlyMyTxns,
  walletConnected,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const selectOptions = [
    { label: t('history.all'), value: 'all' },
    { label: t('history.approval'), value: 'approval' },
    { label: t('history.supply'), value: 'supply' },
    { label: t('history.redeem'), value: 'redeem' },
    { label: t('history.borrow'), value: 'borrow' },
    { label: t('history.repayBorrow'), value: 'repayBorrow' },
    { label: t('history.liquidateBorrow'), value: 'liquidateBorrow' },
    { label: t('history.transfer'), value: 'transfer' },
    { label: t('history.reservesAdded'), value: 'reservesAdded' },
    { label: t('history.reservesReduced'), value: 'reservesReduced' },
    { label: t('history.stake'), value: 'stake' },
    { label: t('history.withdraw'), value: 'withdraw' },
    { label: t('history.claim'), value: 'claim' },
    { label: t('history.propose'), value: 'propose' },
    { label: t('history.vote'), value: 'vote' },
  ];

  const selectAssetOptions = Object.keys(OETH_TOKENS).reduce<AssetRecord[]>(
    (assets: AssetRecord[], key: string) => {
      const newAsset = {
        label: OETH_TOKENS[key as keyof typeof OETH_TOKENS].symbol.substring(1),
        value: OETH_TOKENS[key as keyof typeof OETH_TOKENS].address,
        image: OETH_TOKENS[key as keyof typeof OETH_TOKENS].asset,
      };

      return [...assets, newAsset];
    },
    [{ label: t('history.all'), value: 'all' }],
  );

  return (
    <Paper css={styles.root}>
      <div css={styles.myTransactions}>
        {walletConnected && (
          <>
            <Checkbox
              onChange={e => setShowOnlyMyTxns(e.target.checked)}
              value={showOnlyMyTxns}
              css={styles.checkbox}
            />
            <Typography variant="small2">{t('history.myTransactions')}</Typography>
          </>
        )}
      </div>
      <div css={styles.selectGroup}>
        <div>
          <Typography css={styles.typeSelectLabel} variant="small2">
            {t('history.assetColon')}
          </Typography>
          <Select
            options={selectAssetOptions}
            value={asset}
            onChange={e => setAsset(e.target.value)}
            ariaLabel={t('history.asset')}
            title={t('history.asset')}
            css={styles.select}
          />
        </div>
        <div>
          <Typography css={styles.typeSelectLabel} variant="small2">
            {t('history.typeColon')}
          </Typography>
          <Select
            options={selectOptions}
            value={historyItemType}
            onChange={e => setHistoryItemType(e.target.value as HistoryItemType | typeof ALL_VALUE)}
            ariaLabel={t('history.type')}
            title={t('history.type')}
            css={styles.select}
          />
        </div>
      </div>
    </Paper>
  );
};
export default Filters;
