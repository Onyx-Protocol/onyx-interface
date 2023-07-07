import { ComponentMeta } from '@storybook/react';
import noop from 'lodash';
import React from 'react';

import Filters, { ALL_VALUE } from '.';

export default {
  title: 'Pages/Filters',
  component: Filters,
  parameters: {
    backgrounds: {
      default: 'White',
    },
  },
} as ComponentMeta<typeof Filters>;

export const Default = () => (
  <Filters
    historyItemType={ALL_VALUE}
    setHistoryItemType={noop}
    asset=""
    setAsset={noop}
    showOnlyMyTxns={false}
    setShowOnlyMyTxns={noop}
    walletConnected
  />
);
