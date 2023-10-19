/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { Icon, Pagination, Spinner, TextButton, Tooltip } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { Proposal } from 'types';
import Web3 from 'web3';
import type { TransactionReceipt } from 'web3-core';

import {
  CreateProposalInput,
  useCreateProposal,
  useGetCurrentVotes,
  useGetLatestProposalIdByProposer,
  useGetProposalState,
  useGetProposals,
} from 'clients/api';
import { useWeb3 } from 'clients/web3';
import CREATE_PROPOSAL_THRESHOLD_WEI from 'constants/createProposalThresholdWei';
import { AuthContext } from 'context/AuthContext';
import { createDateFromSecondsTimestamp } from 'utilities/formatToProposal';

import CreateProposalModal from '../CreateProposalModal';
import GovernanceProposal from '../GovernanceProposal';
import { useStyles } from './styles';

interface GovernanceUiProps {
  proposals: Proposal[];
  isLoading: boolean;
  total: number | undefined;
  limit: number;
  setCurrentPage: (page: number) => void;
  createProposal: (
    payload: Omit<CreateProposalInput, 'accountAddress'>,
  ) => Promise<TransactionReceipt>;
  isCreateProposalLoading: boolean;
  canCreateProposal: boolean;
}

export const GovernanceUi: React.FC<GovernanceUiProps> = ({
  proposals,
  isLoading,
  total,
  limit,
  setCurrentPage,
  createProposal,
  isCreateProposalLoading,
  canCreateProposal,
}) => {
  const web3 = useWeb3();
  const [showCreateProposalModal, setShowCreateProposalModal] = useState(false);
  const { t } = useTranslation();
  const styles = useStyles();
  const [modifiedProposals, setModifiedProposals] = useState<
    Array<Proposal & { endDate: Date | undefined }>
  >([]);

  useEffect(() => {
    web3.eth.getBlock(9895283).then(block => {
      // setModifiedProposals(proposals);
      console.log('PPP');
    });
  }, [web3]);

  useEffect(() => {
    if (proposals && proposals.length !== 0) {
      console.log(web3);
      // web3.eth.getBlock(9895283).then(block => {
      //   // setModifiedProposals(proposals);
      //   console.log('PPP');
      // });
      // Promise.all(
      //   [proposals.filter(item => item.isEnded)[0]].map(async proposal => {
      //     let endDate;
      //     if (proposal.isEnded) {
      //       console.log('TTT', proposal.endBlock);
      //       const block = await web3.eth.getBlock(proposal.endBlock);
      //       endDate = createDateFromSecondsTimestamp(+block.timestamp ?? 0);
      //     }

      //     return {
      //       ...proposal,
      //       endDate,
      //     };
      //   }),
      // ).then(p => setModifiedProposals(p));
    }
  }, [proposals, web3]);

  return (
    <div css={styles.root}>
      <div css={[styles.header, styles.bottomSpace]}>
        <Typography variant="h4">{t('vote.proposals')}</Typography>

        <div css={styles.createProposal}>
          <TextButton
            onClick={() => setShowCreateProposalModal(true)}
            css={styles.marginLess}
            disabled={!canCreateProposal}
          >
            {t('vote.createProposalPlus')}
          </TextButton>

          <Tooltip title={t('vote.requiredVotingPower')} css={styles.infoIconWrapper}>
            <Icon name="info" css={styles.infoIcon} />
          </Tooltip>
        </div>
      </div>

      {isLoading && <Spinner css={styles.loader} />}

      <div>
        {modifiedProposals.map(
          ({ id, description, state, endDate, forVotesWei, againstVotesWei }) => (
            <GovernanceProposal
              key={id}
              css={styles.bottomSpace}
              proposalId={id}
              proposalTitle={description.title}
              proposalState={state}
              endDate={endDate}
              forVotesWei={forVotesWei}
              againstVotesWei={againstVotesWei}
            />
          ),
        )}
      </div>

      {!!total && total > 0 && (
        <Pagination
          css={styles.pagination}
          itemsCount={total}
          onChange={(nextIndex: number) => {
            setCurrentPage(nextIndex);
            window.scrollTo(0, 0);
          }}
          itemsPerPageCount={limit}
        />
      )}

      {showCreateProposalModal && (
        <CreateProposalModal
          isOpen={showCreateProposalModal}
          handleClose={() => setShowCreateProposalModal(false)}
          createProposal={createProposal}
          isCreateProposalLoading={isCreateProposalLoading}
        />
      )}
    </div>
  );
};

const Governance: React.FC = () => {
  const { account } = React.useContext(AuthContext);
  const accountAddress = account?.address || '';
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(5);

  const { data: { proposals, total } = { proposals: [] }, isFetching: isGetProposalsFetching } =
    useGetProposals({
      page: currentPage,
      limit,
    });

  const { mutateAsync: createProposal, isLoading: isCreateProposalLoading } = useCreateProposal();

  const { data: currentVotesData } = useGetCurrentVotes(
    { accountAddress },
    { enabled: !!accountAddress },
  );

  const { data: latestProposalData } = useGetLatestProposalIdByProposer(
    { accountAddress },
    { enabled: !!accountAddress },
  );

  const { data: latestProposalStateData } = useGetProposalState(
    { proposalId: latestProposalData?.proposalId || '' },
    { enabled: !!latestProposalData?.proposalId },
  );

  // User has enough votingWeight to create proposal and doesn't currently have an active or pending proposal
  const canCreateProposal =
    currentVotesData?.votesWei.isGreaterThanOrEqualTo(CREATE_PROPOSAL_THRESHOLD_WEI) &&
    latestProposalStateData?.state !== '0' &&
    latestProposalStateData?.state !== '1';

  return (
    <GovernanceUi
      proposals={proposals}
      limit={limit}
      total={total}
      isLoading={isGetProposalsFetching}
      setCurrentPage={setCurrentPage}
      canCreateProposal={!!canCreateProposal}
      createProposal={payload => createProposal({ ...payload, accountAddress })}
      isCreateProposalLoading={isCreateProposalLoading}
    />
  );
};

export default Governance;
