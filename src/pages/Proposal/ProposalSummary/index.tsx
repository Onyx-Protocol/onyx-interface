/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import { ActiveChip, Chip, Countdown, EthLink, PrimaryButton, SecondaryButton } from 'components';
import isAfter from 'date-fns/isAfter';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Proposal } from 'types';
import type { TransactionReceipt } from 'web3-core';

import {
  useCancelProposal,
  useExecuteProposal,
  useGetProposalEta,
  useGetProposalThreshold,
  useQueueProposal,
} from 'clients/api';
import useGetPriorVotes from 'clients/api/queries/getPriorVotes/useGetPriorVotes';
import { useWeb3 } from 'clients/web3';
import { BLOCK_TIME_MS } from 'constants/ethereum';
import { AuthContext } from 'context/AuthContext';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import { createDateFromSecondsTimestamp } from 'utilities/formatToProposal';

import Stepper from './Stepper';
import { useStyles } from './styles';
import TEST_IDS from './testIds';

interface ProposalSummaryUiProps {
  className?: string;
  proposal: Proposal;
}

interface ProposalSummaryContainerProps {
  cancelProposal: () => Promise<TransactionReceipt>;
  executeProposal: () => Promise<TransactionReceipt>;
  queueProposal: () => Promise<TransactionReceipt>;
  isCancelProposalLoading: boolean;
  isExecuteProposalLoading: boolean;
  isQueueProposalLoading: boolean;
  canCancelProposal: boolean;
  proposalEta?: Date;
}

export const ProposalSummaryUi: React.FC<
  ProposalSummaryUiProps & ProposalSummaryContainerProps
> = ({
  className,
  proposal,
  cancelProposal,
  queueProposal,
  executeProposal,
  isCancelProposalLoading,
  isExecuteProposalLoading,
  isQueueProposalLoading,
  canCancelProposal,
  proposalEta,
}) => {
  const web3 = useWeb3();
  const styles = useStyles();
  const { t, Trans, i18n } = useTranslation();
  const handleTransactionMutation = useHandleTransactionMutation();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const {
    state,
    id,
    description: { title },
    createdDate,
    createdTxHash,
    cancelDate,
    cancelTxHash,
    queuedDate,
    queuedTxHash,
    executedDate,
    executedTxHash,
    isStarted,
    isEnded,
    startBlock,
    endBlock,
  } = proposal;

  useEffect(() => {
    if (isStarted) {
      web3.eth.getBlock(startBlock).then(block => {
        setStartDate(createDateFromSecondsTimestamp(+block.timestamp ?? 0));
      });
    }

    if (isEnded) {
      web3.eth.getBlock(endBlock).then(block => {
        setEndDate(createDateFromSecondsTimestamp(+block.timestamp ?? 0));
      });
    }
  }, [proposal]);

  const handleCancelProposal = async () => {
    await handleTransactionMutation({
      mutate: cancelProposal,
      successTransactionModalProps: transactionReceipt => ({
        title: t('vote.theProposalWasCancelled'),
        content: t('vote.pleaseAllowTimeForConfirmation'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  const handleQueueProposal = async () => {
    await handleTransactionMutation({
      mutate: queueProposal,
      successTransactionModalProps: transactionReceipt => ({
        title: t('vote.theProposalWasQueued'),
        content: t('vote.pleaseAllowTimeForConfirmation'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  const handleExecuteProposal = async () => {
    await handleTransactionMutation({
      mutate: executeProposal,
      successTransactionModalProps: transactionReceipt => ({
        title: t('vote.theProposalWasExecuted'),
        content: t('vote.pleaseAllowTimeForConfirmation'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  let updateProposalButton;
  let transactionHash;
  const isExecuteEtaInFuture = !!proposalEta && isAfter(proposalEta, new Date());

  switch (state) {
    case 'Active':
      updateProposalButton = (
        <SecondaryButton
          onClick={handleCancelProposal}
          css={styles.updateProposalButton}
          loading={isCancelProposalLoading}
          data-testid={TEST_IDS.cancelButton}
          disabled={!canCancelProposal}
        >
          {t('voteProposalUi.cancel')}
        </SecondaryButton>
      );
      transactionHash = createdTxHash;
      break;
    case 'Canceled':
      transactionHash = cancelTxHash;
      break;
    case 'Successded':
      updateProposalButton = (
        <PrimaryButton
          onClick={handleQueueProposal}
          css={styles.updateProposalButton}
          loading={isQueueProposalLoading}
          data-testid={TEST_IDS.queueButton}
        >
          {t('voteProposalUi.queue')}
        </PrimaryButton>
      );
      break;
    case 'Queued':
      if (!isExecuteEtaInFuture) {
        updateProposalButton = (
          <PrimaryButton
            onClick={handleExecuteProposal}
            css={styles.updateProposalButton}
            loading={isExecuteProposalLoading}
            data-testid={TEST_IDS.executeButton}
          >
            {t('voteProposalUi.execute')}
          </PrimaryButton>
        );
      }

      transactionHash = queuedTxHash;
      break;
    case 'Defeated':
      break;
    case 'Executed':
      transactionHash = executedTxHash;
      break;
    // no default
  }

  const countdownData = useMemo(() => {
    if (state === 'Active' && endBlock && startBlock && startDate) {
      const blockInterval = (endBlock - startBlock) * (BLOCK_TIME_MS / 1000); // in seconds

      const activeUntilDate = new Date(startDate);
      activeUntilDate.setSeconds(startDate.getSeconds() + blockInterval);

      return {
        date: activeUntilDate,
        // DO NOT REMOVE COMMENT: needed by i18next to extract translation key
        // t('voteProposalUi.activeUntilDate')
        i18nKey: 'voteProposalUi.activeUntilDate',
      };
    }

    if (state === 'Queued' && isExecuteEtaInFuture) {
      return {
        date: proposalEta,
        // DO NOT REMOVE COMMENT: needed by i18next to extract translation key
        // t('voteProposalUi.timeUntilExecutable')
        i18nKey: 'voteProposalUi.timeUntilExecutable',
      };
    }
  }, [state, proposalEta?.getTime(), endBlock, startBlock, startDate, i18n.language]);

  return (
    <Paper css={styles.root} className={className}>
      <div css={styles.leftSection}>
        <div css={styles.topRow}>
          <div>
            <Chip text={`#${id}`} css={styles.chipSpace} />
            {state === 'Active' && <ActiveChip text={t('voteProposalUi.proposalState.active')} />}
          </div>

          {countdownData && (
            <div>
              <Typography variant="small2" css={styles.countdownLabel}>
                <Trans
                  i18nKey={countdownData.i18nKey}
                  components={{
                    Date: <Typography variant="small2" color="textPrimary" />,
                  }}
                  values={{
                    date: endDate,
                  }}
                />
              </Typography>
              &nbsp;
              <Countdown date={countdownData.date} css={styles.countdown} />
            </div>
          )}
        </div>

        <div css={styles.content}>
          <div>
            <Typography variant="h3" css={styles.title}>
              {title}
            </Typography>

            {transactionHash && (
              <EthLink
                text={createdTxHash}
                urlType="tx"
                hash={transactionHash}
                css={styles.transactionLink}
                ellipseBreakpoint="xxl"
              />
            )}
          </div>

          <div>{updateProposalButton}</div>
        </div>
      </div>

      <div css={styles.rightSection}>
        <Typography css={styles.rightTitle}>{t('voteProposalUi.proposalHistory')}</Typography>

        <Stepper
          createdDate={createdDate}
          startDate={startDate}
          cancelDate={cancelDate}
          queuedDate={queuedDate}
          executedDate={executedDate}
          endDate={endDate}
          state={state}
        />
      </div>
    </Paper>
  );
};

const ProposalSummary: React.FC<ProposalSummaryUiProps> = ({ className, proposal }) => {
  const { account } = useContext(AuthContext);
  const accountAddress = account?.address || '';

  const { mutateAsync: cancelProposal, isLoading: isCancelProposalLoading } = useCancelProposal();
  const { mutateAsync: executeProposal, isLoading: isExecuteProposalLoading } =
    useExecuteProposal();
  const { mutateAsync: queueProposal, isLoading: isQueueProposalLoading } = useQueueProposal();

  const handleCancelProposal = () => cancelProposal({ proposalId: proposal.id, accountAddress });
  const handleExecuteProposal = () => executeProposal({ proposalId: proposal.id, accountAddress });
  const handleQueueProposal = () => queueProposal({ proposalId: proposal.id, accountAddress });

  const { data: proposalThresholdData } = useGetProposalThreshold();

  const { data: getProposalEtaData } = useGetProposalEta({
    proposalId: proposal.id,
  });

  const { data: currentVotesData } = useGetPriorVotes(
    { accountAddress, blockNumber: proposal.startBlock },
    { enabled: !!accountAddress && !!proposal.startBlock },
  );

  const canCancelProposal =
    proposalThresholdData?.thresholdWei &&
    currentVotesData?.priorVotes.isGreaterThanOrEqualTo(proposalThresholdData?.thresholdWei);

  return (
    <ProposalSummaryUi
      className={className}
      proposal={proposal}
      proposalEta={getProposalEtaData?.eta}
      cancelProposal={handleCancelProposal}
      executeProposal={handleExecuteProposal}
      queueProposal={handleQueueProposal}
      isCancelProposalLoading={isCancelProposalLoading}
      isExecuteProposalLoading={isExecuteProposalLoading}
      isQueueProposalLoading={isQueueProposalLoading}
      canCancelProposal={!!canCancelProposal}
    />
  );
};

export default ProposalSummary;
