/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BorrowLimitUsedAccountHealth, Icon, Tooltip } from 'components';
import React from 'react';
import { useTranslation } from 'translation';
import { formatCentsToReadableValue } from 'utilities';

import { useApyStyles as useStyles } from './styles';

export interface ApyUiProps {
  borrowBalanceCents: number | undefined;
  borrowLimitCents: number | undefined;
  safeBorrowLimitPercentage: number;
  className?: string;
}

export const ApyUi = ({
  borrowBalanceCents,
  borrowLimitCents,
  safeBorrowLimitPercentage,
  className,
}: ApyUiProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const safeBorrowLimitCents =
    typeof borrowLimitCents === 'number'
      ? Math.floor((borrowLimitCents * safeBorrowLimitPercentage) / 100)
      : undefined;

  const readableSafeBorrowLimit = formatCentsToReadableValue({
    value: safeBorrowLimitCents,
  });

  return (
    <Paper css={styles.container} className={className}>
      <div css={[styles.row, styles.header]}>
        <Typography variant="h4">{t('myAccount.title')}</Typography>
      </div>

      <BorrowLimitUsedAccountHealth
        css={styles.progressBar}
        borrowBalanceCents={borrowBalanceCents}
        safeBorrowLimitPercentage={safeBorrowLimitPercentage}
        borrowLimitCents={borrowLimitCents}
      />

      <div css={styles.bottom}>
        <Icon name="shield" css={styles.shieldIcon} />

        <Typography component="span" variant="small2" css={styles.inlineLabel}>
          {t('myAccount.safeLimit')}
        </Typography>

        <Typography component="span" variant="small1" color="text.primary" css={styles.safeLimit}>
          {readableSafeBorrowLimit}
        </Typography>

        <Tooltip
          css={styles.tooltip}
          title={t('myAccount.safeLimitTooltip', { safeBorrowLimitPercentage })}
        >
          <Icon css={styles.infoIcon} name="info" />
        </Tooltip>
      </div>
    </Paper>
  );
};

export default ApyUi;
