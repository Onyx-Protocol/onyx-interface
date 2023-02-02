import { ComponentMeta, Story } from '@storybook/react';
import noop from 'noop-ts';
import React from 'react';

import fakeAddress from '__mocks__/models/address';
import { assetData } from '__mocks__/models/asset';
import { withAuthContext, withCenterStory, withEnabledToken } from 'stories/decorators';

import { WithdrawProps, WithdrawUi, WithdrawUiProps } from '.';

export default {
  title: 'Pages/Dashboard/Modals/Withdraw',
  component: WithdrawUi,
  decorators: [withCenterStory({ width: 600 })],
  parameters: {
    backgrounds: {
      default: 'Primary',
    },
  },
} as ComponentMeta<typeof WithdrawUi>;

const Template: Story<WithdrawUiProps & WithdrawProps> = args => <WithdrawUi {...args} />;

const context = {
  login: noop,
  logOut: noop,
  openAuthModal: noop,
  closeAuthModal: noop,
  account: {
    address: fakeAddress,
  },
};

export const DisconnectedWithdraw = Template.bind({});
DisconnectedWithdraw.args = {
  onClose: noop,
  isWithdrawLoading: false,
};

export const DisabledWithdraw = Template.bind({});
DisabledWithdraw.decorators = [withAuthContext(context)];
DisabledWithdraw.args = {
  onClose: noop,
  onSubmitWithdraw: noop,
  isWithdrawLoading: false,
};

export const Withdraw = Template.bind({});
Withdraw.decorators = [
  withAuthContext(context),
  withEnabledToken({
    token: assetData[0].token,
    accountAddress: fakeAddress,
    spenderAddress: assetData[0].token.address,
  }),
];
Withdraw.args = {
  onClose: noop,
  onSubmitWithdraw: noop,
  isWithdrawLoading: false,
};
