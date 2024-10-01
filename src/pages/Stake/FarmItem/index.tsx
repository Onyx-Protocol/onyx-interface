// FarmItemUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, TokenIcon } from 'components';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Asset } from 'types';
import {
  convertWeiToTokens,
  formatCentsToReadableValue,
  formatToReadablePercentage,
  formatTokensToReadableValue,
} from 'utilities';
import type { TransactionReceipt } from 'web3-core/types';

import { useClaimXcn, useGetUserMarketInfo } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';

import { StakeModal, WithdrawModal } from '../Modals';
import { useStyles } from './styles';
import TEST_IDS from './testIds';

type ActiveModal = 'stake' | 'withdraw';

export interface FarmItemUiProps {
  onClaimReward: () => Promise<TransactionReceipt | void>;
  onStake: () => void;
  onWithdraw: () => Promise<TransactionReceipt | void>;
  closeActiveModal: () => void;
  isClaimRewardLoading: boolean;
  canWithdraw?: boolean;
  activeModal?: ActiveModal;
  className?: string;
  xcnBalance: BigNumber;
  apy: number;
  totalStaked: BigNumber;
  rewardPerBlock: BigNumber;
  staked: BigNumber;
  earned: BigNumber;
  tresury: BigNumber;
}

export const FarmItemUi: React.FC<FarmItemUiProps> = ({
  onClaimReward,
  onStake,
  onWithdraw,
  closeActiveModal,
  isClaimRewardLoading,
  canWithdraw = true,
  activeModal,
  className,
  xcnBalance,
  apy,
  totalStaked,
  rewardPerBlock,
  staked,
  earned,
  tresury,
}) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();

  const {
    data: { assets },
  } = useGetUserMarketInfo({});

  const handleTransactionMutation = useHandleTransactionMutation();

  const handleClaimReward = () =>
    handleTransactionMutation({
      mutate: onClaimReward,
      successTransactionModalProps: transactionReceipt => ({
        title: t('farmItem.successfulClaimRewardTransactionModal.title'),
        content: t('farmItem.successfulClaimRewardTransactionModal.description'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });

  const handleWithdraw = () =>
    handleTransactionMutation({
      mutate: onWithdraw,
      successTransactionModalProps: transactionReceipt => ({
        title: t('farmItem.successfulWithdrawVrtTransactionModal.title'),
        content: t('farmItem.successfulWithdrawVrtTransactionModal.description'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });

  const stakedToken = TOKENS.xcn;
  const rewardToken = TOKENS.xcn;

  const xcnAsset: Asset | undefined = React.useMemo(
    () => assets.find(asset => asset.token === TOKENS.xcn),
    [assets],
  );

  const farmDailyEmission: string = React.useMemo(
    () =>
      formatTokensToReadableValue({
        value: rewardPerBlock.div(1e18).times(86400 / 12),
        token: rewardToken,
        shortenLargeValue: true,
        addSymbol: false,
      }),
    [rewardPerBlock],
  );

  const readableUserPendingRewardTokens = useConvertWeiToReadableTokenString({
    valueWei: earned,
    token: rewardToken,
    minimizeDecimals: true,
    addSymbol: false,
  });

  const readableUserStakedTokens = useConvertWeiToReadableTokenString({
    token: stakedToken,
    valueWei: staked || new BigNumber(0),
    minimizeDecimals: true,
    addSymbol: false,
  });

  const readableTresuryValue = formatCentsToReadableValue({
    value: tresury.times(100),
    shortenLargeValue: true,
  });
  const readableTresuryTokens = convertWeiToTokens({
    valueWei: tresury.times(1e18).div(xcnAsset?.tokenPrice || 1) || new BigNumber(0),
    token: stakedToken,
    returnInReadableFormat: true,
    shortenLargeValue: true,
    addSymbol: false,
  });

  const dataListItems = useMemo(
    () => [
      {
        title: t('farmItem.stakingApr', { stakeTokenName: '' }),
        value: formatToReadablePercentage(apy),
      },
      {
        title: t('farmItem.dailyEmission'),
        value: (
          <>
            <TokenIcon css={styles.tokenIcon} token={rewardToken} />
            {farmDailyEmission}
          </>
        ),
      },
      {
        title: t('farmItem.totalStaked'),
        value: (
          <>
            <TokenIcon css={styles.tokenIcon} token={stakedToken} />
            {convertWeiToTokens({
              valueWei: totalStaked || new BigNumber(0),
              token: stakedToken,
              returnInReadableFormat: true,
              shortenLargeValue: true,
              addSymbol: false,
            })}{' '}
            (
            {formatCentsToReadableValue({
              value: totalStaked
                .div(1e18)
                .times(xcnAsset?.tokenPrice || 0)
                .times(100),
              shortenLargeValue: true,
            })}
            )
          </>
        ),
      },
      {
        title: t('market.totalTreasury'),
        value: (
          <>
            <TokenIcon css={styles.tokenIcon} token={rewardToken} />
            {readableTresuryTokens}{' '}
            (
            {readableTresuryValue}
            )
          </>
        ),
      },
    ],
    [totalStaked, apy, xcnAsset, i18n.language],
  );

  return (
    <>
      <Paper css={styles.container} className={className}>
        <div css={styles.header}>
          <div css={styles.left}>
            <div css={styles.title}>
              <TokenIcon css={styles.tokenIcon} token={stakedToken} />

              <Typography variant="h4" css={styles.text} data-testid={TEST_IDS.symbol}>
                {stakedToken.symbol}
              </Typography>
            </div>
          </div>

          {earned.isGreaterThan(0) && (
            <div css={styles.rewardWrapper}>
              <Typography css={[styles.text, styles.textSmallMobile]}>
                {t('farmItem.reward')}
              </Typography>

              <TokenIcon css={[styles.tokenIcon, styles.tokenIconWithdraw]} token={rewardToken} />

              <Typography
                css={[styles.text, styles.textRewardValue, styles.textSmallMobile]}
                variant="body1"
                color="textPrimary"
                data-testid={TEST_IDS.userPendingRewardTokens}
              >
                {readableUserPendingRewardTokens}
              </Typography>

              <Button
                onClick={handleClaimReward}
                variant="text"
                css={styles.buttonClaim}
                loading={isClaimRewardLoading}
              >
                {t('farmItem.claimButton')}
              </Button>
            </div>
          )}
        </div>

        <Typography variant="small2" css={[styles.label, styles.stakingLabel]}>
          {t('farmItem.youAreStaking')}
        </Typography>

        <Typography
          variant="h1"
          css={styles.textStakingValue}
          data-testid={TEST_IDS.userStakedTokens}
        >
          <TokenIcon css={styles.tokenIcon} token={stakedToken} />

          {readableUserStakedTokens}
        </Typography>

        <ul css={styles.dataRow}>
          {dataListItems.map(({ title, value }) => (
            <li key={title} css={styles.valueWrapper}>
              <Typography variant="small2" css={[styles.label, styles.textSmallMobile]}>
                {title}
              </Typography>

              <Typography
                variant="h4"
                css={[styles.textAligned, styles.textSmallMobile]}
                data-testid={TEST_IDS.dataListItem}
              >
                {value}
              </Typography>
            </li>
          ))}
        </ul>

        <div css={styles.buttonsWrapper}>
          <Button onClick={onStake} css={styles.button} variant="primary">
            {t('farmItem.stakeButton')}
          </Button>

          {canWithdraw && (
            <Button
              onClick={handleWithdraw}
              css={styles.button}
              variant="secondary"
              loading={false}
            >
              {t('farmItem.withdrawButton')}
            </Button>
          )}
        </div>
      </Paper>

      {activeModal === 'stake' && (
        <StakeModal xcnBalance={xcnBalance} handleClose={closeActiveModal} />
      )}

      {activeModal === 'withdraw' && (
        <WithdrawModal stakedBalance={staked} handleClose={closeActiveModal} />
      )}
    </>
  );
};

export interface FarmItemProps {
  xcnBalance: BigNumber;
  apy: number;
  totalStaked: BigNumber;
  rewardPerBlock: BigNumber;
  staked: BigNumber;
  earned: BigNumber;
  tresury: BigNumber;
}

const FarmItem: React.FC<FarmItemProps> = data => {
  const { account } = useContext(AuthContext);

  const [activeModal, setActiveModal] = useState<ActiveModal | undefined>();
  const onStake = () => {
    setActiveModal('stake');
  };

  const onWithdraw = async () => {
    setActiveModal('withdraw');
  };

  const closeActiveModal = () => setActiveModal(undefined);

  const { mutateAsync: claimXcn, isLoading: isClaimXcnLoading } = useClaimXcn();
  const onClaimReward = async () =>
    claimXcn({
      accountAddress: account?.address || '',
    });
  return (
    <FarmItemUi
      onClaimReward={onClaimReward}
      isClaimRewardLoading={isClaimXcnLoading}
      onStake={onStake}
      onWithdraw={onWithdraw}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      canWithdraw
      {...data}
    />
  );
};

export default FarmItem;
