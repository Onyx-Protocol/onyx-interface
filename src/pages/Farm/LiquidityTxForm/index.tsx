/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { Button, FormikSubmitButton, FormikTokenTextField, LabeledInlineContent } from 'components';
import React from 'react';
import { useTranslation } from 'translation';
import { convertTokensToWei, convertWeiToTokens } from 'utilities';
import type { TransactionReceipt } from 'web3-core/types';

import { Farm } from 'clients/api';
import { AmountForm2 } from 'containers/AmountForm2';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

export interface LiquidityTxFormProps {
  farm: Farm;
  submitButtonLabel: string;
  successfulTransactionTitle: string;
  successfulTransactionDescription: string;
  availableTokensLabel1: string;
  availableTokensLabel2: string;
  onSubmit: (amountWei1: BigNumber, amountWei2: BigNumber) => Promise<TransactionReceipt>;
  isSubmitting: boolean;
}

const LiquidityTxForm: React.FC<LiquidityTxFormProps> = ({
  farm,
  submitButtonLabel,
  successfulTransactionTitle,
  successfulTransactionDescription,
  availableTokensLabel1,
  availableTokensLabel2,
  onSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const handleTransactionMutation = useHandleTransactionMutation();

  const stringifiedAvailableTokens1 = React.useMemo(
    () =>
      convertWeiToTokens({
        valueWei: farm.userData?.tokenBalance1 || new BigNumber(0),
        token: farm.token,
      }).toFixed(),
    [farm.userData?.tokenBalance1],
  );

  const stringifiedAvailableTokens2 = React.useMemo(
    () =>
      convertWeiToTokens({
        valueWei: farm.userData?.tokenBalance2 || new BigNumber(0),
        token: farm.quoteToken,
      }).toFixed(),
    [farm.userData?.tokenBalance2],
  );

  const readableAvailableTokens1 = useConvertWeiToReadableTokenString({
    valueWei: farm.userData?.tokenBalance1 || new BigNumber(0),
    token: farm.token,
    minimizeDecimals: true,
  });

  const readableAvailableTokens2 = useConvertWeiToReadableTokenString({
    valueWei: farm.userData?.tokenBalance2 || new BigNumber(0),
    token: farm.quoteToken,
    minimizeDecimals: true,
  });

  const handleSubmit = async (amountTokens1: string, amountTokens2: string) => {
    const amountWei1 = convertTokensToWei({
      value: new BigNumber(amountTokens1),
      token: farm.token,
    });

    const amountWei2 = convertTokensToWei({
      value: new BigNumber(amountTokens2),
      token: farm.quoteToken,
    });

    return handleTransactionMutation({
      mutate: () => onSubmit(amountWei1, amountWei2),
      successTransactionModalProps: transactionReceipt => ({
        title: successfulTransactionTitle,
        content: successfulTransactionDescription,
        amount: {
          valueWei: amountWei1,
          token: farm.token,
        },
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  return (
    <AmountForm2
      onSubmit={handleSubmit}
      maxAmount1={stringifiedAvailableTokens1}
      maxAmount2={stringifiedAvailableTokens2}
    >
      {({ dirty, isValid }) => (
        <>
          <FormikTokenTextField
            name="amount1"
            token={farm.token}
            disabled={isSubmitting}
            rightMaxButton={{
              label: t('vault.transactionForm.rightMaxButtonLabel'),
              valueOnClick: stringifiedAvailableTokens1,
            }}
            max={stringifiedAvailableTokens1}
            data-testid={TEST_IDS.tokenTextField}
            css={styles.tokenTextField}
          />

          <LabeledInlineContent
            data-testid={TEST_IDS.availableTokens}
            label={availableTokensLabel1}
            css={styles.getRow()}
          >
            {readableAvailableTokens1}
          </LabeledInlineContent>

          <div css={styles.plus}>+</div>

          <FormikTokenTextField
            name="amount2"
            token={farm.quoteToken}
            disabled={isSubmitting}
            rightMaxButton={{
              label: t('vault.transactionForm.rightMaxButtonLabel'),
              valueOnClick: stringifiedAvailableTokens2,
            }}
            max={stringifiedAvailableTokens2}
            data-testid={TEST_IDS.tokenTextField}
            css={styles.tokenTextField}
          />

          <LabeledInlineContent
            data-testid={TEST_IDS.availableTokens}
            label={availableTokensLabel2}
            css={styles.getRow()}
          >
            {readableAvailableTokens2}
          </LabeledInlineContent>

          <div css={styles.approveButtonBar}>
            <Button>Approve {farm.token.symbol}</Button>
            <Button>Approve {farm.quoteToken.symbol}</Button>
          </div>
          <FormikSubmitButton
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            fullWidth
            enabledLabel={submitButtonLabel}
            disabledLabel={submitButtonLabel}
          />
        </>
      )}
    </AmountForm2>
  );
};

export default LiquidityTxForm;
