import { fireEvent, waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import fakeAddress from '__mocks__/models/address';
import fakeTransactionReceipt from '__mocks__/models/transactionReceipt';
import { claimXcnReward, getXcnReward } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';
import renderComponent from 'testUtils/renderComponent';

import ClaimXcnRewardButton from '.';
import TEST_IDS from '../testIds';

jest.mock('clients/api');
jest.mock('hooks/useSuccessfulTransactionModal');

describe('pages/Dashboard/ClaimXcnRewardButton', () => {
  it('renders without crashing', () => {
    renderComponent(<ClaimXcnRewardButton />);
  });

  it('renders nothing if user have not connected any wallet', () => {
    const { queryAllByTestId } = renderComponent(<ClaimXcnRewardButton />);
    expect(queryAllByTestId(TEST_IDS.claimXcnRewardButton)).toHaveLength(0);
  });

  it('renders nothing if user have no claimable XCN reward', () => {
    const { queryAllByTestId } = renderComponent(() => <ClaimXcnRewardButton />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });
    expect(queryAllByTestId(TEST_IDS.claimXcnRewardButton)).toHaveLength(0);
  });

  it('renders correct XCN reward when user are connected and have claimable XCN reward', async () => {
    (getXcnReward as jest.Mock).mockImplementationOnce(async () => ({
      xcnRewardWei: new BigNumber('10000000000000000'),
    }));

    const { getByTestId } = renderComponent(() => <ClaimXcnRewardButton />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    await waitFor(() => expect(getByTestId(TEST_IDS.claimXcnRewardButton)));
    expect(getByTestId(TEST_IDS.claimXcnRewardButton).textContent).toContain('0.01 XCN');
  });

  it('it claims XCN reward on click and displays successful transaction modal on success', async () => {
    const fakeXcnReward = new BigNumber('10000000000000000');

    const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();
    (getXcnReward as jest.Mock).mockImplementationOnce(async () => ({
      xcnRewardWei: fakeXcnReward,
    }));
    (claimXcnReward as jest.Mock).mockImplementationOnce(async () => fakeTransactionReceipt);

    const { getByTestId } = renderComponent(() => <ClaimXcnRewardButton />, {
      authContextValue: {
        account: {
          address: fakeAddress,
        },
      },
    });

    await waitFor(() => expect(getByTestId(TEST_IDS.claimXcnRewardButton)));

    // Trigger claim
    fireEvent.click(getByTestId(TEST_IDS.claimXcnRewardButton));

    // Check claimXcnReward was called and success toast was displayed
    await waitFor(() => expect(claimXcnReward).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(openSuccessfulTransactionModal).toHaveBeenCalledTimes(1));
    expect(openSuccessfulTransactionModal).toHaveBeenCalledWith({
      transactionHash: fakeTransactionReceipt.transactionHash,
      amount: {
        token: TOKENS.xcn,
        valueWei: fakeXcnReward,
      },
      content: expect.any(String),
      title: expect.any(String),
    });
  });
});
