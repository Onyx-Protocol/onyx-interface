import { Matcher, MatcherOptions, fireEvent, waitFor, within } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { cloneDeep } from 'lodash';
import React from 'react';
import { act } from 'react-dom/test-utils';

import fakeAddress from '__mocks__/models/address';
import proposals from '__mocks__/models/proposals';
import voters from '__mocks__/models/voters';
import {
  GetVotersInput,
  cancelProposal,
  getCurrentVotes,
  getPriorVotes,
  getProposal,
  getProposalThreshold,
  getVoteReceipt,
  useGetVoters,
} from 'clients/api';
import CREATE_PROPOSAL_THRESHOLD_WEI from 'constants/createProposalThresholdWei';
import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';
import useVote from 'hooks/useVote';
import renderComponent from 'testUtils/renderComponent';
import en from 'translation/translations/en.json';

import Proposal from '.';
import VOTE_MODAL_TEST_IDS from './VoteModal/testIds';
import TEST_IDS from './testIds';

jest.mock('clients/api');
jest.mock('hooks/useVote');

const checkAllButtons = async (
  getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
  check: (element: HTMLElement) => void,
) => {
  const voteForButton = await waitFor(async () =>
    within(getByTestId(TEST_IDS.voteSummary.for)).getByRole('button'),
  );
  const voteAgainstButton = await waitFor(async () =>
    within(getByTestId(TEST_IDS.voteSummary.against)).getByRole('button'),
  );
  const voteAbstainButton = await waitFor(async () =>
    within(getByTestId(TEST_IDS.voteSummary.abstain)).getByRole('button'),
  );

  check(voteForButton);
  check(voteAgainstButton);
  check(voteAbstainButton);
};

describe('pages/Proposal', () => {
  beforeEach(async () => {
    const activeProposal = (await proposals)[1];
    jest.useFakeTimers('modern').setSystemTime(new Date());

    (getVoteReceipt as jest.Mock).mockImplementation(() => ({
      voteSupport: 'NOT_VOTED',
    }));
    (getProposal as jest.Mock).mockImplementation(() => activeProposal);

    (getProposalThreshold as jest.Mock).mockImplementation(() => ({
      thresholdWei: CREATE_PROPOSAL_THRESHOLD_WEI,
    }));

    (useVote as jest.Mock).mockImplementation(() => ({
      vote: jest.fn(),
      isLoading: false,
    }));

    (getCurrentVotes as jest.Mock).mockImplementation(() => ({
      votesWei: new BigNumber('100000000000000000'),
    }));

    (getPriorVotes as jest.Mock).mockImplementation(() => ({
      priorVotes: CREATE_PROPOSAL_THRESHOLD_WEI,
    }));
  });

  it('renders without crashing', async () => {
    renderComponent(<Proposal />);
  });

  it('renders without crashing on', async () => {
    (getProposal as jest.Mock).mockImplementation(async () => (await proposals)[0]);
    renderComponent(<Proposal />);
  });

  it('vote buttons are disabled when wallet is not connected', async () => {
    const { getByTestId } = renderComponent(<Proposal />);
    await checkAllButtons(getByTestId, (element: HTMLElement) => expect(element).toBeDisabled());
  });

  it('vote buttons are disabled when proposal is not active', async () => {
    (getProposal as jest.Mock).mockImplementationOnce(async () => (await proposals)[3]);
    const { getByTestId } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });
    await checkAllButtons(getByTestId, (element: HTMLElement) => expect(element).toBeDisabled());
  });

  it('vote buttons are disabled when vote is cast', async () => {
    (getVoteReceipt as jest.Mock).mockImplementation(() => ({
      voteSupport: 'FOR',
    }));

    const { getByTestId } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    await checkAllButtons(getByTestId, (element: HTMLElement) => expect(element).toBeDisabled());
  });

  it('vote buttons are disabled when voting weight is 0', async () => {
    (getCurrentVotes as jest.Mock).mockImplementation(() => ({ votesWei: new BigNumber(0) }));

    const { getByTestId } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    await checkAllButtons(getByTestId, (element: HTMLElement) => expect(element).toBeDisabled());
  });

  it('vote buttons are enabled when requirements are met', async () => {
    const { getByTestId } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    await checkAllButtons(getByTestId, (element: HTMLElement) => expect(element).toBeEnabled());
  });

  it('allows user to vote for', async () => {
    const vote = jest.fn();
    (useVote as jest.Mock).mockImplementation(() => ({
      vote,
      isLoading: false,
    }));
    const { getByTestId, getByLabelText } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    const voteButton = await waitFor(async () =>
      within(getByTestId(TEST_IDS.voteSummary.for)).getByRole('button'),
    );
    act(() => {
      fireEvent.click(voteButton);
    });

    const votingPower = await waitFor(async () => getByLabelText(en.vote.votingPower));
    expect(votingPower).toHaveValue('0.1');

    const castButton = await waitFor(async () => getByTestId(VOTE_MODAL_TEST_IDS.submitButton));
    expect(castButton).toBeEnabled();
    act(() => {
      fireEvent.click(castButton);
    });
    waitFor(() => expect(vote).toBeCalledWith({ proposalId: 97, voteReason: '', voteType: 1 }));
  });

  it('allows user to vote against with reason', async () => {
    const vote = jest.fn();
    (useVote as jest.Mock).mockImplementation(() => ({
      vote,
      isLoading: false,
    }));

    const comment = 'Not a good idea';
    const { getByTestId, getByLabelText } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    const voteButton = await waitFor(async () =>
      within(getByTestId(TEST_IDS.voteSummary.against)).getByRole('button'),
    );
    act(() => {
      fireEvent.click(voteButton);
    });

    const votingPower = await waitFor(async () => getByLabelText(en.vote.votingPower));
    expect(votingPower).toHaveValue('0.1');

    const commentInput = await waitFor(async () => getByLabelText(en.vote.comment));
    fireEvent.change(commentInput, { target: { value: comment } });

    const castButton = await waitFor(async () => getByTestId(VOTE_MODAL_TEST_IDS.submitButton));
    expect(castButton).toBeEnabled();
    act(() => {
      fireEvent.click(castButton);
    });

    await waitFor(() =>
      expect(vote).toBeCalledWith({ proposalId: 97, voteReason: comment, voteType: 0 }),
    );
  });

  it('allows user to vote abstain', async () => {
    const vote = jest.fn();
    (useVote as jest.Mock).mockImplementation(() => ({
      vote,
      isLoading: false,
    }));

    const { getByTestId, getByLabelText } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    const voteButton = await waitFor(async () =>
      within(getByTestId(TEST_IDS.voteSummary.abstain)).getByRole('button'),
    );
    act(() => {
      fireEvent.click(voteButton);
    });

    const votingPower = await waitFor(async () => getByLabelText(en.vote.votingPower));
    expect(votingPower).toHaveValue('0.1');

    const castButton = await waitFor(async () => getByTestId(VOTE_MODAL_TEST_IDS.submitButton));
    expect(castButton).toBeEnabled();
    act(() => {
      fireEvent.click(castButton);
    });
    await waitFor(() =>
      expect(vote).toBeCalledWith({ proposalId: 97, voteReason: '', voteType: 2 }),
    );
  });

  it('lists votes cast', async () => {
    (useGetVoters as jest.Mock).mockImplementation(({ filter }: { filter: 0 | 1 | 2 }) => {
      const votersCopy = cloneDeep(voters);
      votersCopy.result = [votersCopy.result[filter]];
      return { data: votersCopy, isLoading: false };
    });
    const { getByTestId } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });
    const againstVoteSummary = await waitFor(async () =>
      within(getByTestId(TEST_IDS.voteSummary.against)),
    );
    againstVoteSummary.getByText(voters.result[0].address);

    const forVoteSummary = await waitFor(async () => within(getByTestId(TEST_IDS.voteSummary.for)));
    forVoteSummary.getByText(voters.result[1].address);

    const abstainVoteSummary = await waitFor(async () =>
      within(getByTestId(TEST_IDS.voteSummary.abstain)),
    );
    abstainVoteSummary.getByText(voters.result[2].address);
  });

  it('allows user with enough voting weight to cancel', async () => {
    (getPriorVotes as jest.Mock).mockImplementation(() => ({
      priorVotes: new BigNumber(CREATE_PROPOSAL_THRESHOLD_WEI),
    }));
    (useGetVoters as jest.Mock).mockImplementation(({ support }: GetVotersInput) => {
      const votersCopy = cloneDeep(voters);
      votersCopy.result = votersCopy.result.filter(
        item => item.support === indexedVotingSupportNames[Number(support)],
      );
      return { data: votersCopy, isLoading: false };
    });

    const { getByText } = renderComponent(<Proposal />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    const cancelButton = await waitFor(
      async () => getByText(en.voteProposalUi.cancel).closest('button') as HTMLButtonElement,
    );

    act(() => {
      fireEvent.click(cancelButton);
    });
    await waitFor(() => expect(cancelButton).toBeEnabled());
    expect(cancelProposal).toBeCalledWith({ accountAddress: fakeAddress, proposalId: 4 });
  });
});
