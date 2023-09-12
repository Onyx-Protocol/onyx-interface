/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { Pagination, Spinner } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { VoterHistory } from 'types';

import { useWeb3 } from '../../../clients/web3';
import { createDateFromSecondsTimestamp } from '../../../utilities/formatToProposal';

import VoterProposal from './VoterProposal';
import { useStyles } from './styles';

interface HistoryProps {
  className?: string;
  voterHistory: VoterHistory[] | undefined;
  setCurrentPage: (page: number) => void;
  total: number;
  limit: number;
  isFetching: boolean;
}

export const History: React.FC<HistoryProps> = ({
  className,
  voterHistory = [],
  setCurrentPage,
  total,
  limit,
  isFetching,
}) => {
  const web3 = useWeb3();
  const styles = useStyles();
  const { t } = useTranslation();
  const [voterHistoryModified, setVoterHistoryModified] = useState<
    Array<
      VoterHistory & {
        proposal: VoterHistory['proposal'] & { endDate: Date | undefined };
      }
    >
  >([]);

  useEffect(() => {
    if (voterHistory) {
      Promise.all(
        voterHistory.map(async vh => {
          let endDate;
          if (vh.proposal.isEnded) {
            const block = await web3.eth.getBlock(vh.proposal.endBlock);
            endDate = createDateFromSecondsTimestamp(+block.timestamp ?? 0);
          }

          return {
            ...vh,
            proposal: {
              ...vh.proposal,
              endDate,
            },
          };
        }),
      ).then(vh => setVoterHistoryModified(vh));
    }
  }, [voterHistory]);

  return (
    <div className={className}>
      <Typography variant="h4">{t('voterDetail.votingHistory')}</Typography>
      {isFetching && <Spinner />}
      {voterHistoryModified.map(
        ({
          proposal: {
            id,
            description,
            state,
            forVotesWei,
            againstVotesWei,
            createdDate,
            queuedDate,
            cancelDate,
            endDate,
            executedDate,
          },
          support,
        }) => (
          <VoterProposal
            key={id}
            proposalNumber={id}
            proposalTitle={description.title}
            proposalState={state}
            forVotesWei={forVotesWei}
            againstVotesWei={againstVotesWei}
            userVoteStatus={support}
            createdDate={createdDate}
            queuedDate={queuedDate}
            cancelDate={cancelDate}
            executedDate={executedDate}
            endDate={endDate}
          />
        ),
      )}
      {total ? (
        <Pagination
          css={styles.pagination}
          itemsCount={total}
          onChange={(nextIndex: number) => {
            setCurrentPage(nextIndex);
            window.scrollTo(0, 0);
          }}
          itemsPerPageCount={limit}
        />
      ) : null}
    </div>
  );
};

export default History;
