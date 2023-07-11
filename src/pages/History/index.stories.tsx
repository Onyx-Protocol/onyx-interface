import { ComponentMeta } from '@storybook/react';
import noop from 'noop-ts';
import React from 'react';

import historyItems from '__mocks__/models/historyItems';

import { HistoryUi } from '.';
import { ALL_VALUE } from './Filters';

export default {
  title: 'Pages/History',
  component: HistoryUi,
  parameters: {
    backgrounds: {
      default: 'White',
    },
  },
} as ComponentMeta<typeof HistoryUi>;

export const Default = () => (
  <HistoryUi
    historyItemType={ALL_VALUE}
    setHistoryItemType={noop}
    asset=""
    setAsset={noop}
    showOnlyMyTxns={false}
    setShowOnlyMyTxns={noop}
    historyItems={historyItems}
    walletConnected
    isFetching={false}
    limit={20}
    total={60}
    setCurrentPage={noop}
  />
);
