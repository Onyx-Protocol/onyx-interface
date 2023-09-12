import { ComponentMeta } from '@storybook/react';
import noop from 'noop-ts';
import React, { useEffect, useState } from 'react';
import { Proposal } from 'types';

import proposals from '__mocks__/models/proposals';
import voters from '__mocks__/models/voters';
import { withRouter } from 'stories/decorators';

import { ProposalUi } from '.';

export default {
  title: 'Pages/Proposal',
  component: ProposalUi,
  decorators: [withRouter],
} as ComponentMeta<typeof ProposalUi>;

export const Default = () => {
  const [fetchedProposals, setFetchedProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    proposals.then(p => {
      setFetchedProposals(p);
    });
  }, []);

  return (
    <ProposalUi
      proposal={fetchedProposals[0]}
      forVoters={voters}
      againstVoters={voters}
      abstainVoters={voters}
      votingEnabled
      readableVoteWeight="123390000"
      vote={noop}
      isVoteLoading={false}
    />
  );
};
