import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { withCenterStory, withThemeProvider } from 'stories/decorators';

import { EthLink } from '.';

export default {
  title: 'Components/EthLink',
  component: EthLink,
  decorators: [withThemeProvider, withCenterStory({ width: 600 })],
} as ComponentMeta<typeof EthLink>;

export const Default = () => (
  <EthLink hash="0x6b8a5663cd46f7b719391c518c60e2f45427b95a082e3e47739b011faccbfc96" />
);
