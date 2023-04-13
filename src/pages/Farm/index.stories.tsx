import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { farms } from '__mocks__/models/farms';
import { withRouter } from 'stories/decorators';

import { FarmUi } from '.';

export default {
  title: 'Pages/Farm',
  component: FarmUi,
  decorators: [withRouter],
} as ComponentMeta<typeof FarmUi>;

export const Loading = () => <FarmUi farms={farms} isInitialLoading />;

export const Default = () => <FarmUi farms={farms} isInitialLoading={false} />;
