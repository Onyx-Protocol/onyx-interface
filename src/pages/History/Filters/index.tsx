/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import { Checkbox, Select } from 'components';
import React from 'react';
import { useTranslation } from 'translation';
import { TransactionEvent } from 'types';

import { useStyles } from './styles';

export const ALL_VALUE = 'All';

export interface FilterProps {
  eventType: TransactionEvent | typeof ALL_VALUE;
  setEventType: (eventType: TransactionEvent | typeof ALL_VALUE) => void;
  showOnlyMyTxns: boolean;
  setShowOnlyMyTxns: (showOnlyMyTxns: boolean) => void;
  walletConnected: boolean;
}

export const Filters: React.FC<FilterProps> = ({
  eventType,
  setEventType,
  showOnlyMyTxns,
  setShowOnlyMyTxns,
  walletConnected,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const selectOptions = [
    { label: t('history.all'), value: 'All' },
    { label: t('history.supply'), value: 'Supply' },
    { label: t('history.redeem'), value: 'Redeem' },
    { label: t('history.borrow'), value: 'Borrow' },
    { label: t('history.repayBorrow'), value: 'Repay' },
    { label: t('history.liquidateBorrow'), value: 'Liquidate Borrow' },
    // { label: t('history.transfer'), value: 'Transfer' },
    { label: t('history.stake'), value: 'Stake' },
    { label: t('history.withdraw'), value: 'Withdraw' },
    { label: t('history.claim'), value: 'Claim' },
  ];
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
      <div>
        <Typography css={styles.typeSelectLabel} variant="small2">
          {t('history.typeColon')}
        </Typography>
        <Select
          options={selectOptions}
          value={eventType}
          onChange={e => setEventType(e.target.value as TransactionEvent | typeof ALL_VALUE)}
          ariaLabel={t('history.type')}
          title={t('history.type')}
          css={styles.select}
        />
      </div>
    </Paper>
  );
};
export default Filters;
