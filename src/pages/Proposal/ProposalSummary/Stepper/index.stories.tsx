import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import proposals from '__mocks__/models/proposals';
import { withCenterStory } from 'stories/decorators';

import Stepper, { StepperProps } from '.';

export default {
  title: 'Pages/Proposal/Components/Stepper',
  component: Stepper,
  decorators: [withCenterStory({ width: 400 })],
} as ComponentMeta<typeof Stepper>;

const Template: Story<StepperProps> = (args: StepperProps) => <Stepper {...args} />;

export const Pending = Template.bind({});
Pending.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Pending',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000000700),
  queuedDate: undefined,
};

export const Active = Template.bind({});
Active.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Defeated = Template.bind({});
Defeated.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Successded = Template.bind({});
Successded.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Canceled = Template.bind({});
Canceled.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Expired = Template.bind({});
Expired.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Queued = Template.bind({});
Queued.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};

export const Executed = Template.bind({});
Executed.args = {
  createdDate: new Date(),
  cancelDate: undefined,
  state: 'Active',
  startDate: undefined,
  executedDate: undefined,
  endDate: new Date(1654000009000),
  queuedDate: undefined,
};
