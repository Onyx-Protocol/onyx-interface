/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { Button, FormikSubmitButton, FormikTokenTextField, LabeledInlineContent } from 'components';
import { VError, formatVErrorToReadableString } from 'errors';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { convertTokensToWei, convertWeiToTokens, getContractAddress } from 'utilities';
import type { TransactionReceipt } from 'web3-core/types';

import { Farm } from 'clients/api';
import { useWeb3 } from 'clients/web3';
import { TOKENS } from 'constants/tokens';
import { AmountForm2 } from 'containers/AmountForm2';
import { AuthContext } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useGetOutAmount from 'hooks/useGetOutAmount';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import useTokenApproval from 'hooks/useTokenApproval';

import { toast } from '../../../components/Toast';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

export interface LiquidityTxFormProps {
  farm: Farm;
  submitButtonLabel: string;
  successfulTransactionTitle: string;
  successfulTransactionDescription: string;
  availableTokensLabel1: string;
  availableTokensLabel2: string;
  onSubmit: (
    amountWei1: BigNumber,
    amountWei2: BigNumber,
    ethFlag: string,
  ) => Promise<TransactionReceipt>;
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
  const { account } = useContext(AuthContext);
  const web3 = useWeb3();

  const [amount1, setAmount1] = useState(new BigNumber(0));
  const [amount2, setAmount2] = useState(new BigNumber(0));
  const [ethBalance, setEthBalance] = useState(new BigNumber(0));
  const [lastInput, setLastInput] = useState('');
  const [wethSwitched, setWethSwitched] = useState(false);

  const outAmount1 = useGetOutAmount(farm, amount2, 'token2', lastInput);
  const outAmount2 = useGetOutAmount(farm, amount1, 'token1', lastInput);

  const handleTransactionMutation = useHandleTransactionMutation();

  const { approveToken: approveToken1, isApproveTokenLoading: isApproveTokenLoading1 } =
    useTokenApproval({
      token: farm.token,
      spenderAddress: getContractAddress('uniSwapRouter'),
      accountAddress: account?.address,
      farmRefresh: true,
    });

  const { approveToken: approveToken2, isApproveTokenLoading: isApproveTokenLoading2 } =
    useTokenApproval({
      token: farm.quoteToken,
      spenderAddress: getContractAddress('uniSwapRouter'),
      accountAddress: account?.address,
      farmRefresh: true,
    });

  useEffect(() => {
    const getEthBalance = async () => {
      const balanceWei = await web3.eth.getBalance(account?.address || '0x0');
      setEthBalance(new BigNumber(balanceWei));
    };
    if (account && (farm.token.symbol === 'WETH' || farm.quoteToken.symbol === 'WETH')) {
      getEthBalance();
    }
  }, [farm, account]);

  const stringifiedAvailableTokens1 = React.useMemo(
    () =>
      convertWeiToTokens({
        valueWei:
          farm.token.symbol === 'WETH' && wethSwitched
            ? ethBalance
            : farm.userData?.tokenBalance1 || new BigNumber(0),
        token: farm.token,
      }).toFixed(),
    [farm.userData?.tokenBalance1, wethSwitched, ethBalance],
  );

  const stringifiedAvailableTokens2 = React.useMemo(
    () =>
      convertWeiToTokens({
        valueWei:
          farm.quoteToken.symbol === 'WETH' && wethSwitched
            ? ethBalance
            : farm.userData?.tokenBalance2 || new BigNumber(0),
        token: farm.quoteToken,
      }).toFixed(),
    [farm.userData?.tokenBalance2, wethSwitched, ethBalance],
  );

  const readableAvailableTokens1 = useConvertWeiToReadableTokenString({
    valueWei:
      farm.token.symbol === 'WETH' && wethSwitched
        ? ethBalance
        : farm.userData?.tokenBalance1 || new BigNumber(0),
    token: farm.token.symbol === 'WETH' && wethSwitched ? TOKENS.eth : farm.token,
    minimizeDecimals: true,
  });

  const readableAvailableTokens2 = useConvertWeiToReadableTokenString({
    valueWei:
      farm.quoteToken.symbol === 'WETH' && wethSwitched
        ? ethBalance
        : farm.userData?.tokenBalance2 || new BigNumber(0),
    token: farm.quoteToken.symbol === 'WETH' && wethSwitched ? TOKENS.eth : farm.quoteToken,
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

    let ethFlag = '';
    if (wethSwitched) {
      if (farm.token.symbol === 'WETH') ethFlag = 'token1';
      else ethFlag = 'token2';
    }

    return handleTransactionMutation({
      mutate: () => onSubmit(amountWei1, amountWei2, ethFlag),
      successTransactionModalProps: transactionReceipt => ({
        title: successfulTransactionTitle,
        content: successfulTransactionDescription,
        amount: {
          valueWei: amountWei1,
          token: farm.token,
          valueWei2: amountWei2,
          token2: farm.quoteToken,
        },
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  const handleApproveToken = async (which: string) => {
    try {
      if (which === 'token1') await approveToken1();
      else await approveToken2();
    } catch (error) {
      let { message } = error as Error;

      if (error instanceof VError) {
        message = formatVErrorToReadableString(error);
      }

      toast.error({
        message,
      });
    }
  };

  const handleWethSwitch = () => {
    setWethSwitched(!wethSwitched);
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
            handleChange={(val: string) => {
              setAmount1(convertTokensToWei({ value: new BigNumber(val), token: farm.token }));
              setLastInput('token1');
            }}
            outAmount={outAmount1}
            decimals={farm.token.decimals}
            handleWethSwitch={farm.token.symbol === 'WETH' ? handleWethSwitch : undefined}
            wethSwitched={farm.token.symbol === 'WETH' ? wethSwitched : undefined}
          />

          <LabeledInlineContent
            data-testid={TEST_IDS.availableTokens}
            label={
              farm.token.symbol === 'WETH' && wethSwitched ? 'Available ETH' : availableTokensLabel1
            }
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
            handleChange={val => {
              setAmount2(convertTokensToWei({ value: new BigNumber(val), token: farm.quoteToken }));
              setLastInput('token2');
            }}
            outAmount={outAmount2}
            decimals={farm.quoteToken.decimals}
            handleWethSwitch={farm.quoteToken.symbol === 'WETH' ? handleWethSwitch : undefined}
            wethSwitched={farm.quoteToken.symbol === 'WETH' ? wethSwitched : undefined}
          />

          <LabeledInlineContent
            data-testid={TEST_IDS.availableTokens}
            label={
              farm.quoteToken.symbol === 'WETH' && wethSwitched
                ? 'Available ETH'
                : availableTokensLabel2
            }
            css={styles.getRow()}
          >
            {readableAvailableTokens2}
          </LabeledInlineContent>

          <div css={styles.approveButtonBar}>
            {!(farm.token.symbol === 'WETH' && wethSwitched) &&
              ((lastInput === 'token1' && farm.userData?.allowance1.lt(amount1)) ||
                (lastInput === 'token2' &&
                  farm.userData?.allowance1.lt(outAmount1 || new BigNumber(0)))) && (
                <Button
                  disabled={isApproveTokenLoading1}
                  loading={isApproveTokenLoading1}
                  onClick={() => handleApproveToken('token1')}
                >
                  Approve {farm.token.symbol}
                </Button>
              )}
            {!(farm.quoteToken.symbol === 'WETH' && wethSwitched) &&
              ((lastInput === 'token2' && farm.userData?.allowance2.lt(amount2)) ||
                (lastInput === 'token1' &&
                  farm.userData?.allowance2.lt(outAmount2 || new BigNumber(0)))) && (
                <Button
                  disabled={isApproveTokenLoading2}
                  loading={isApproveTokenLoading2}
                  onClick={() => handleApproveToken('token2')}
                >
                  Approve {farm.quoteToken.symbol}
                </Button>
              )}
          </div>
          <FormikSubmitButton
            loading={isSubmitting}
            disabled={
              !isValid ||
              !dirty ||
              isSubmitting ||
              (!(farm.token.symbol === 'WETH' && wethSwitched) &&
                ((lastInput === 'token1' && farm.userData?.allowance1.lt(amount1)) ||
                  (lastInput === 'token2' &&
                    farm.userData?.allowance1.lt(outAmount1 || new BigNumber(0))))) ||
              (!(farm.quoteToken.symbol === 'WETH' && wethSwitched) &&
                ((lastInput === 'token2' && farm.userData?.allowance2.lt(amount2)) ||
                  (lastInput === 'token1' &&
                    farm.userData?.allowance2.lt(outAmount2 || new BigNumber(0)))))
            }
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
