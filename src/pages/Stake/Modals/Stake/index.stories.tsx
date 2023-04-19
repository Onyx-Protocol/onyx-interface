import { ComponentMeta, Story } from '@storybook/react';
import noop from 'noop-ts';
import React from 'react';

import fakeAddress from '__mocks__/models/address';
import { assetData } from '__mocks__/models/asset';
import { withAuthContext, withCenterStory, withEnabledToken } from 'stories/decorators';

import { StakeProps, StakeUi, StakeUiProps } from '.';

export default {
  title: 'Pages/Dashboard/Modals/Stake',
  component: StakeUi,
  decorators: [withCenterStory({ width: 600 })],
  parameters: {
    backgrounds: {
      default: 'Primary',
    },
  },
} as ComponentMeta<typeof StakeUi>;

const Template: Story<StakeUiProps & StakeProps> = args => <StakeUi {...args} />;

const context = {
  login: noop,
  logOut: noop,
  openAuthModal: noop,
  closeAuthModal: noop,
  account: {
    address: fakeAddress,
  },
};

export const DisconnectedStake = Template.bind({});
DisconnectedStake.args = {
  onClose: noop,
  isStakeLoading: false,
};

export const DisabledStake = Template.bind({});
DisabledStake.decorators = [withAuthContext(context)];
DisabledStake.args = {
  onClose: noop,
  onSubmitStake: noop,
  isStakeLoading: false,
};

export const Stake = Template.bind({});
Stake.decorators = [
  withAuthContext(context),
  withEnabledToken({
    token: assetData[0].token,
    accountAddress: fakeAddress,
    spenderAddress: assetData[0].token.address,
  }),
];
Stake.args = {
  onClose: noop,
  onSubmitStake: noop,
  isStakeLoading: false,
};
