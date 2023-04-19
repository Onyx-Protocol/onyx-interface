/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { FormikSubmitButton, FormikTokenTextField, toast } from 'components';
import { VError, formatVErrorToReadableString } from 'errors';
import React from 'react';
import { useTranslation } from 'translation';
import { formatTokensToReadableValue } from 'utilities';

import { TOKENS } from 'constants/tokens';
import { AmountForm, AmountFormProps, ErrorCode } from 'containers/AmountForm';

import { useStyles } from '../styles';

interface StakeFormUiProps {
  maxInput: BigNumber;
  inputLabel: string;
  calculateNewBalance: (initial: BigNumber, amount: BigNumber) => BigNumber;
  isTransactionLoading: boolean;
  amountValue: string;
}

export const StakeContent: React.FC<StakeFormUiProps> = ({
  maxInput,
  inputLabel,
  // calculateNewBalance,
  isTransactionLoading,
  amountValue,
}) => {
  const styles = useStyles();
  const { t, Trans } = useTranslation();

  const amount = new BigNumber(amountValue || 0);
  const validAmount = amount && !amount.isZero() && !amount.isNaN();

  return (
    <>
      <FormikTokenTextField
        name="amount"
        token={TOKENS.xcn}
        disabled={isTransactionLoading}
        rightMaxButton={{
          label: t('stakeWithdraw.max').toUpperCase(),
          valueOnClick: maxInput.toFixed(),
        }}
        css={styles.input}
        // Only display error state if amount is higher than borrow limit
        displayableErrorCodes={[ErrorCode.HIGHER_THAN_MAX]}
      />
      <Typography
        component="div"
        variant="small2"
        css={[styles.greyLabel, styles.getRow({ isLast: true })]}
      >
        <Trans
          i18nKey={inputLabel}
          components={{
            White: <span css={styles.whiteLabel} />,
          }}
          values={{
            amount: formatTokensToReadableValue({
              value: maxInput,
              token: TOKENS.xcn,
            }),
          }}
        />
      </Typography>

      <FormikSubmitButton
        fullWidth
        disabled={!validAmount}
        loading={isTransactionLoading}
        enabledLabel={t('stakeWithdraw.stake')}
        disabledLabel={t('stakeWithdraw.stake')}
      />
    </>
  );
};

interface StakeFormProps extends Omit<StakeFormUiProps, 'amountValue'> {
  onSubmit: AmountFormProps['onSubmit'];
}

const StakeForm: React.FC<StakeFormProps> = ({ onSubmit, maxInput, ...props }) => {
  const onSubmitHandleError: AmountFormProps['onSubmit'] = async (value: string) => {
    try {
      await onSubmit(value);
    } catch (error) {
      let { message } = error as Error;
      if (error instanceof VError) {
        message = formatVErrorToReadableString(error);
        toast.error({
          message,
        });
      }
    }
  };

  return (
    <AmountForm onSubmit={onSubmitHandleError} maxAmount={maxInput.toFixed()}>
      {({ values }) => <StakeContent maxInput={maxInput} amountValue={values.amount} {...props} />}
    </AmountForm>
  );
};

export default StakeForm;
