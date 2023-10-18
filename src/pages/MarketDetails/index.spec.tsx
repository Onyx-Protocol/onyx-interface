import { waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { createMemoryHistory } from 'history';
import React from 'react';

import { marketSnapshots } from '__mocks__/models/marketSnapshots';
import { markets } from '__mocks__/models/markets';
import { oTokenApySimulations } from '__mocks__/models/oTokenApySimulations';
import { getMarketHistory, getMarkets, getOTokenApySimulations } from 'clients/api';
import renderComponent from 'testUtils/renderComponent';

import MarketDetails from '.';
import TEST_IDS from './testIds';

const fakeOTokenId = 'wbtc';

jest.mock('clients/api');

describe('pages/MarketDetails', () => {
  beforeEach(() => {
    (getMarketHistory as jest.Mock).mockImplementation(() => ({
      marketSnapshots,
    }));
    (getMarkets as jest.Mock).mockImplementation(() => ({
      markets,
      dailyXcnWei: new BigNumber(0),
    }));
    (getOTokenApySimulations as jest.Mock).mockImplementation(() => ({
      apySimulations: oTokenApySimulations,
    }));
  });

  it('renders without crashing', () => {
    const fakeHistory = createMemoryHistory();
    renderComponent(
      <MarketDetails
        history={fakeHistory}
        location="/"
        match={{
          params: {
            oTokenId: fakeOTokenId,
          },
          isExact: true,
          path: '/:oTokenId',
          url: '',
        }}
      />,
    );
  });

  it('fetches market details and displays them correctly', async () => {
    const fakeHistory = createMemoryHistory();
    const { getByTestId } = renderComponent(
      <MarketDetails
        history={fakeHistory}
        location="/"
        match={{
          params: {
            oTokenId: fakeOTokenId,
          },
          isExact: true,
          path: '/:oTokenId',
          url: '',
        }}
      />,
    );

    // Check supply info displays correctly
    await waitFor(() => expect(getByTestId(TEST_IDS.supplyInfo).textContent).toMatchSnapshot());
    // Check borrow info displays correctly
    expect(getByTestId(TEST_IDS.borrowInfo).textContent).toMatchSnapshot();
    // Check interest rate model displays correctly
    expect(getByTestId(TEST_IDS.interestRateModel).textContent).toMatchSnapshot();
    // Check market info displays correctly
    expect(getByTestId(TEST_IDS.marketInfo).textContent).toMatchSnapshot();
  });
});
