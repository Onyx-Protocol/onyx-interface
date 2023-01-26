import BigNumber from 'bignumber.js';
import React from 'react';

import { useGetUserMarketInfo } from 'clients/api';
import renderComponent from 'testUtils/renderComponent';

import Xcn from '.';

jest.mock('clients/api');

describe('pages/Xcn', () => {
  beforeEach(() => {
    (useGetUserMarketInfo as jest.Mock).mockImplementation(() => ({
      data: {
        assets: [],
        userTotalBorrowLimitCents: new BigNumber('111'),
        userTotalBorrowBalanceCents: new BigNumber('91'),
        userTotalSupplyBalanceCents: new BigNumber('910'),
        dailyXcnWei: new BigNumber('22222'),
        totalXcnDistributedWei: new BigNumber('22222'),
      },
      isLoading: false,
    }));
  });

  it('renders without crashing', async () => {
    renderComponent(<Xcn />);
  });
});
