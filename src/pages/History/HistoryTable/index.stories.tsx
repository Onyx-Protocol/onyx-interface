import { ComponentMeta } from '@storybook/react';
import React from 'react';

import historyItems from '__mocks__/models/historyItems';

import { HistoryTableUi } from '.';

export default {
  title: 'Pages/History/Table',
  component: HistoryTableUi,
  parameters: {
    backgrounds: {
      default: 'White',
    },
  },
} as ComponentMeta<typeof HistoryTableUi>;

export const Default = () => <HistoryTableUi historyItems={historyItems} isFetching={false} />;
