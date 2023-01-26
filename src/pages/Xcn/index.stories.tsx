import { ComponentMeta } from '@storybook/react';

import { withRouter } from 'stories/decorators';

import Xcn from '.';

export default {
  title: 'Pages/Xcn',
  component: Xcn,
  decorators: [withRouter],
} as ComponentMeta<typeof Xcn>;

export { Xcn };
