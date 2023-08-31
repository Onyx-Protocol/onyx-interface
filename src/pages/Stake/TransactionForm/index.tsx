/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import {
  FormikSubmitButton,
  FormikTokenTextField,
  Icon,
  LabeledInlineContent,
  PrimaryButton,
} from 'components';
import React from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertTokensToWei, convertWeiToTokens } from 'utilities';
import type { TransactionReceipt } from 'web3-core/types';

import { useGetAllowance } from 'clients/api';
import { AmountForm } from 'containers/AmountForm';
import { AuthContext } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import useTokenApproval from 'hooks/useTokenApproval';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

export interface TransactionFormProps {
  token: Token;
  submitButtonLabel: string;
  submitButtonDisabledLabel: string;
  successfulTransactionTitle: string;
  successfulTransactionDescription: string;
  onSubmit: (amountWei: BigNumber) => Promise<TransactionReceipt>;
  isSubmitting: boolean;
  availableTokensWei: BigNumber;
  availableTokensLabel: string;
  lockingPeriodMs?: number;
  spenderAddress?: string;
  tokenNeedsToBeEnabled?: boolean;
  increaseAllowanceMessage?: string;
  increaseAllowanceButtonLabel?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  token,
  availableTokensWei,
  availableTokensLabel,
  submitButtonLabel,
  submitButtonDisabledLabel,
  successfulTransactionTitle,
  successfulTransactionDescription,
  onSubmit,
  isSubmitting,
  lockingPeriodMs,
  spenderAddress,
  tokenNeedsToBeEnabled,
  increaseAllowanceMessage,
  increaseAllowanceButtonLabel,
}) => {
  const { account } = React.useContext(AuthContext);
  const { t } = useTranslation();
  const styles = useStyles();

  const handleTransactionMutation = useHandleTransactionMutation();

  const [amount, setAmount] = React.useState('');
  const [requireEnable, setRequireEnable] = React.useState(false);

  const { data: getTokenAllowanceData } = useGetAllowance(
    {
      accountAddress: account ? account.address : '',
      spenderAddress: spenderAddress ?? '',
      token,
    },
    {
      enabled: !!account?.address && !!spenderAddress && !token.isNative && tokenNeedsToBeEnabled,
    },
  );

  const { approveToken, isApproveTokenLoading } = useTokenApproval({
    token,
    spenderAddress: spenderAddress ?? '',
    accountAddress: account ? account.address : '',
  });

  const stringifiedAvailableTokens = React.useMemo(
    () =>
      convertWeiToTokens({
        valueWei: availableTokensWei,
        token,
      }).toFixed(),
    [availableTokensWei.toFixed()],
  );

  const readableAvailableTokens = useConvertWeiToReadableTokenString({
    valueWei: availableTokensWei,
    token,
    minimizeDecimals: true,
  });

  const readableLockingPeriod = React.useMemo(() => {
    if (!lockingPeriodMs) {
      return undefined;
    }

    const now = new Date();
    const unlockingDate = new Date(now.getTime() + lockingPeriodMs);

    return t('vault.transactionForm.lockingPeriod.duration', { date: unlockingDate });
  }, [lockingPeriodMs?.toFixed()]);

  React.useEffect(() => {
    if (spenderAddress && amount !== '' && getTokenAllowanceData) {
      const amountWei = convertTokensToWei({
        value: new BigNumber(amount),
        token,
      });

      setRequireEnable(getTokenAllowanceData.allowanceWei.lt(amountWei));
    }
  }, [spenderAddress, amount, getTokenAllowanceData]);

  const handleSubmit = async (amountTokens: string) => {
    const amountWei = convertTokensToWei({
      value: new BigNumber(amountTokens),
      token,
    });

    return handleTransactionMutation({
      mutate: () => onSubmit(amountWei),
      successTransactionModalProps: transactionReceipt => ({
        title: successfulTransactionTitle,
        content: successfulTransactionDescription,
        amount: {
          valueWei: amountWei,
          token,
        },
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  return (
    <AmountForm onSubmit={handleSubmit} maxAmount={stringifiedAvailableTokens}>
      {({ dirty, isValid }) => (
        <>
          <div css={styles.tokenTextField}>
            <FormikTokenTextField
              name="amount"
              token={token}
              disabled={isSubmitting}
              rightMaxButton={{
                label: t('vault.transactionForm.rightMaxButtonLabel'),
                valueOnClick: stringifiedAvailableTokens,
              }}
              handleChange={setAmount}
              max={stringifiedAvailableTokens}
              data-testid={TEST_IDS.tokenTextField}
            />
            {requireEnable && (
              <div css={styles.info}>
                <Icon name="info" />
                <Typography variant="small2" color="text.primary">
                  {increaseAllowanceMessage}
                </Typography>
              </div>
            )}
          </div>

          <LabeledInlineContent
            data-testid={TEST_IDS.availableTokens}
            label={availableTokensLabel}
            css={styles.getRow({ isLast: !readableLockingPeriod })}
          >
            {readableAvailableTokens}
          </LabeledInlineContent>

          {readableLockingPeriod && (
            <LabeledInlineContent
              data-testid={TEST_IDS.lockingPeriod}
              label={t('vault.transactionForm.lockingPeriod.label')}
              css={styles.getRow({ isLast: true })}
            >
              {readableLockingPeriod}
            </LabeledInlineContent>
          )}

          {requireEnable ? (
            <PrimaryButton
              disabled={isApproveTokenLoading}
              loading={isApproveTokenLoading}
              fullWidth
              onClick={approveToken}
            >
              {increaseAllowanceButtonLabel}
            </PrimaryButton>
          ) : (
            <FormikSubmitButton
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              fullWidth
              enabledLabel={submitButtonLabel}
              disabledLabel={submitButtonDisabledLabel}
            />
          )}
        </>
      )}
    </AmountForm>
  );
};

export default TransactionForm;
