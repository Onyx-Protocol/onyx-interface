import { waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import fakeAddress from '__mocks__/models/address';
import { assetsInAccount } from '__mocks__/models/assetsInAccount';
import { markets } from '__mocks__/models/markets';
import { oTokenBalanceTreasury } from '__mocks__/models/oTokenBalanceTreasury';
import { oTokenBalancesAccount } from '__mocks__/models/oTokenBalancesAccount';
import { getAssetsInAccount, getMarkets, useGetOTokenBalancesAll } from 'clients/api';
import renderComponent from 'testUtils/renderComponent';

import useGetUserMarketInfo, { UseGetUserMarketInfoOutput } from '.';

jest.mock('clients/api');

describe('api/queries/useGetUserMarketInfo', () => {
  beforeEach(() => {
    (getMarkets as jest.Mock).mockImplementation(() => ({ markets }));
    (getAssetsInAccount as jest.Mock).mockImplementation(() => ({
      tokenAddresses: assetsInAccount,
    }));

    (useGetOTokenBalancesAll as jest.Mock).mockImplementation(({ account }) => {
      if (account === fakeAddress) {
        return { data: { balances: oTokenBalancesAccount } };
      }
      return { data: { balances: oTokenBalanceTreasury } };
    });
  });

  it('calculates totals correctly', async () => {
    let data: UseGetUserMarketInfoOutput['data'] = {
      assets: [],
      userTotalBorrowBalanceCents: new BigNumber(0),
      userTotalBorrowLimitCents: new BigNumber(0),
      userTotalSupplyBalanceCents: new BigNumber(0),
      totalXcnDistributedWei: new BigNumber(0),
      dailyXcnWei: new BigNumber(0),
    };

    const CallMarketContext = () => {
      ({ data } = useGetUserMarketInfo({ accountAddress: fakeAddress }));
      return <div />;
    };

    renderComponent(<CallMarketContext />, {
      authContextValue: { account: { address: fakeAddress } },
    });

    await waitFor(() => expect(data.assets.length > 0).toBe(true));
    expect(data).toMatchSnapshot();
  });
});
