import { fireEvent, waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { cloneDeep } from 'lodash';
import React from 'react';
import { act } from 'react-dom/test-utils';

import fakeAccountAddress from '__mocks__/models/address';
import proposals from '__mocks__/models/proposals';
import { vaults } from '__mocks__/models/vaults';
import {
  getCurrentVotes,
  getLatestProposalIdByProposer,
  getProposalState,
  getProposals,
} from 'clients/api';
import PATHS from 'constants/path';
import renderComponent from 'testUtils/renderComponent';
import en from 'translation/translations/en.json';

import Vote from '.';
import GOVERNANCE_PROPOSAL_TEST_IDS from './GovernanceProposal/testIds';
import VOTING_WALLET_TEST_IDS from './VotingWallet/testIds';

jest.mock('clients/api');
jest.mock('hooks/useSuccessfulTransactionModal');

describe('pages/Vote', () => {
  beforeEach(() => {
    (getProposals as jest.Mock).mockImplementation(async () => ({
      proposals: await proposals,
      total: 100,
    }));
    (getLatestProposalIdByProposer as jest.Mock).mockImplementation(() => '1');

    (getCurrentVotes as jest.Mock).mockImplementation(() => ({
      votesWei: new BigNumber(0),
    }));
  });

  it('renders without crashing', async () => {
    renderComponent(<Vote />);
  });

  it('opens create proposal modal when clicking text', async () => {
    const { getByText } = renderComponent(<Vote />);
    const createProposalButton = getByText(en.vote.createProposalPlus);

    act(() => {
      fireEvent.click(createProposalButton);
    });

    waitFor(() => getByText(en.vote.pages.proposalInformation));
  });

  it('create proposal is disabled if pending proposal', async () => {
    (getCurrentVotes as jest.Mock).mockImplementationOnce(() => ({
      votesWei: new BigNumber('50000000000000000000'),
    }));
    (getProposalState as jest.Mock).mockImplementation(async () => ({ state: '0' }));
    const { getByText } = renderComponent(<Vote />);
    const createProposalButton = getByText(en.vote.createProposalPlus).closest('button');

    expect(createProposalButton).toBeDisabled();
  });

  it('create proposal is disabled if active proposal', async () => {
    (getCurrentVotes as jest.Mock).mockImplementationOnce(() => ({
      votesWei: new BigNumber('50000000000000000000'),
    }));
    (getProposalState as jest.Mock).mockImplementation(async () => ({ state: '1' }));
    const { getByText } = renderComponent(<Vote />);
    const createProposalButton = getByText(en.vote.createProposalPlus).closest('button');

    expect(createProposalButton).toBeDisabled();
  });

  it('prompts user to connect Wallet', async () => {
    (getCurrentVotes as jest.Mock).mockImplementationOnce(() => ({ votesWei: new BigNumber(0) }));

    const { getByText } = renderComponent(<Vote />);
    getByText(en.connectWallet.connectButton);
  });

  it('prompts user to deposit XCN', async () => {
    const vaultsCopy = cloneDeep(vaults);
    vaultsCopy[1].userStakedWei = new BigNumber(0);
    (getCurrentVotes as jest.Mock).mockImplementationOnce(() => ({ votesWei: new BigNumber(0) }));

    const { getByTestId } = renderComponent(<Vote />, {
      authContextValue: {
        account: {
          address: fakeAccountAddress,
        },
      },
    });

    expect(getByTestId(VOTING_WALLET_TEST_IDS.votingWeightValue)).toHaveTextContent('0');
  });

  it.only('proposals navigate to details', async () => {
    const { getAllByTestId } = renderComponent(<Vote />);
    // Getting all because the cards are rendered twice (once for mobile and once for larger screens)
    const firstProposalAnchor = await waitFor(async () =>
      getAllByTestId(GOVERNANCE_PROPOSAL_TEST_IDS.governanceProposal('3')),
    );

    expect(firstProposalAnchor[0].firstChild).toHaveAttribute(
      'href',
      `#${PATHS.GOVERNANCE_PROPOSAL_DETAILS.replace(':id', '3')}`,
    );
  });
});
