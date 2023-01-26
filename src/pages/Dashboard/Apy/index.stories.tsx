import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { withCenterStory, withThemeProvider } from 'stories/decorators';

import ApyUi from './ApyUi';

export default {
  title: 'Pages/Dashboard/Apy',
  component: ApyUi,
  decorators: [withThemeProvider, withCenterStory({ width: 650 })],
  parameters: {
    backgrounds: {
      default: 'Primary',
    },
  },
} as ComponentMeta<typeof ApyUi>;

export const Default = () => (
  <ApyUi
    borrowBalanceCents={30243}
    borrowLimitCents={73730}
    safeBorrowLimitPercentage={65}
  />
);

export const WithZeroValues = () => (
  <ApyUi
    borrowBalanceCents={0}
    borrowLimitCents={0}
    safeBorrowLimitPercentage={65}
  />
);

export const WithoutUndefinedValues = () => (
  <ApyUi
    borrowBalanceCents={undefined}
    borrowLimitCents={undefined}
    safeBorrowLimitPercentage={65}
  />
);
