/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { FormikSubmitButton, FormikTextField, Modal, TextField } from 'components';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Proposal } from 'types';
import { convertWeiToTokens } from 'utilities';
import type { TransactionReceipt } from 'web3-core';

import { TOKENS } from 'constants/tokens';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

interface VoteModalProps {
  voteModalType: 0 | 1 | 2;
  handleClose: () => void;
  vote: (voteReason: string) => Promise<TransactionReceipt>;
  voteWeight: BigNumber;
  stakeAmount: BigNumber;
  isVoteLoading: boolean;
  proposal: Proposal;
}

// TODO: add tests

const VoteModal: React.FC<VoteModalProps> = ({
  handleClose,
  vote,
  voteWeight,
  stakeAmount,
  voteModalType = 0,
  isVoteLoading,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const handleTransactionMutation = useHandleTransactionMutation();

  let title: string;
  let successModalTitle: string;
  switch (voteModalType) {
    case 0:
      title = t('vote.voteAgainst');
      successModalTitle = t('vote.youSuccessfullyVotedAgainstTheProposal');
      break;
    case 1:
      title = t('vote.voteFor');
      successModalTitle = t('vote.youSuccessfullyVotedForTheProposal');
      break;
    case 2:
      title = t('vote.voteAbstain');
      successModalTitle = t('vote.youSuccessfullyVotedAbstained');
      break;
    // no default
  }

  const handleOnSubmit = async ({ reason }: { reason: string }) => {
    await handleTransactionMutation({
      mutate: async () => {
        const result = await vote(reason);
        handleClose();
        return result;
      },
      successTransactionModalProps: transactionReceipt => ({
        title: successModalTitle,
        content: t('vote.pleaseAllowTimeForConfirmation'),
        transactionHash: transactionReceipt.transactionHash,
      }),
    });
  };

  const readableVoteWeight = useMemo(
    () =>
      convertWeiToTokens({
        valueWei: voteWeight,
        token: TOKENS.xcn,
        returnInReadableFormat: true,
        addSymbol: false,
      }),
    [voteWeight.toFixed()],
  );

  return (
    <Modal
      isOpen={voteModalType !== undefined}
      handleClose={handleClose}
      title={title}
      css={styles.root}
    >
      <Formik initialValues={{ reason: '' }} onSubmit={handleOnSubmit}>
        {() => (
          <Form>
            <TextField
              label={t('vote.votingPower')}
              name="votingPower"
              id="votingPower"
              leftIconSrc={TOKENS.xcn}
              disabled
              value={readableVoteWeight}
              css={styles.votingPower}
              description={
                !voteWeight.isEqualTo(stakeAmount)
                  ? t('vote.votingPowerIsLessThanStakedBecause')
                  : ''
              }
            />
            <FormikTextField
              label={t('vote.comment')}
              name="reason"
              id="reason"
              placeholder={t('vote.addComment')}
              maxLength={256}
              css={styles.comment}
            />
            <FormikSubmitButton
              enabledLabel={title}
              fullWidth
              loading={isVoteLoading}
              data-testid={TEST_IDS.submitButton}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default VoteModal;
