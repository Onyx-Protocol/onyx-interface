import config from 'config';
import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';

import historyItems from '__mocks__/models/historyItems';
import TEST_IDS from 'components/Spinner/testIds';
import { SUBGRAPH_LINKS } from 'constants/endpoints';
import renderComponent from 'testUtils/renderComponent';

import History from '.';

enableFetchMocks();

describe('pages/History', () => {
  beforeEach(() => {
    fetchMock.mockResponse(
      JSON.stringify({
        status: 200,
        data: {
          historyItems,
        },
      }),
    );
  });

  it('renders without crashing', async () => {
    renderComponent(<History />);
  });

  it('fetches transaction on mount', async () => {
    renderComponent(<History />);

    expect(fetchMock).toBeCalledWith(SUBGRAPH_LINKS[config.chainId].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query historyItemsQuery {
            historyItems(
              first: 26,
              skip: 0,
              orderBy: blockTimestamp,
              orderDirection: desc
              ${''}
            ) {
              id
              type
              to
              from
              amount
              blockNumber
              blockTimestamp
              transactionHash
            }
          }
        `,
      }),
    });
  });

  it('renders spinner when fetching', async () => {
    const { getByTestId } = renderComponent(<History />);
    getByTestId(TEST_IDS.spinner);
  });

  it('address filter is hidden with no wallet connected', async () => {
    const { queryByRole } = renderComponent(<History />);
    const myAddressCheckbox = queryByRole('checkbox');
    expect(myAddressCheckbox).toBe(null);
  });
});
