import { waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import { assetData } from '__mocks__/models/asset';
import { useGetUserMarketInfo } from 'clients/api';
import renderComponent from 'testUtils/renderComponent';
import en from 'translation/translations/en.json';

import BorrowRepay from '.';

const asset = assetData[1];

jest.mock('clients/api');

describe('pages/Dashboard/BorrowRepayModal', () => {
  beforeEach(() => {
    (useGetUserMarketInfo as jest.Mock).mockImplementation(() => ({
      data: {
        assets: assetData,
        userTotalBorrowLimitCents: new BigNumber('111'),
        userTotalBorrowBalanceCents: new BigNumber('91'),
      },
      isLoading: false,
    }));
  });

  it('renders without crashing', async () => {
    const { getByText } = renderComponent(
      <BorrowRepay onClose={jest.fn()} asset={asset} isXcnEnabled />,
    );
    await waitFor(() => expect(getByText(en.borrowRepayModal.borrowTabTitle)));
  });
});
