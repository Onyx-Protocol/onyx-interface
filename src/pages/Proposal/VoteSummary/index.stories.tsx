import { ComponentMeta } from '@storybook/react';
import BigNumber from 'bignumber.js';
import noop from 'noop-ts';
import React from 'react';

import { ThemeContext } from 'context/ThemeContext';
import { withCenterStory, withThemeProvider } from 'stories/decorators';
import { PALETTE } from 'theme/MuiThemeProvider/muiTheme';

import VoteSummary from './index';

export default {
  title: 'Pages/Proposal/Components/VoteSummary',
  component: VoteSummary,
  decorators: [withThemeProvider, withCenterStory({ width: 500 })],
  parameters: {
    backgrounds: {
      default: 'Default',
    },
  },
} as ComponentMeta<typeof VoteSummary>;

const votes = [
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b74c2976',
    voteWeightWei: new BigNumber('1000'),
    reason: 'comment text from storybook',
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b74c297s',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b74c297q',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b74b2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41dea391b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de23d1b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de23a1b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2391b7qc2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41de2v91b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
  {
    address: '0x33AAb7ED8C71C6910Fb4A9bc41dn2391b74c2977',
    voteWeightWei: new BigNumber('1271'),
    support: 'FOR' as const,
  },
];

export const VoteFor = () => {
  const { mode: themeMode } = React.useContext(ThemeContext);
  return (
    <VoteSummary
      label="For"
      votedValueWei={new BigNumber('100000000000000000')}
      votedTotalWei={new BigNumber('200000000000000000')}
      voters={votes}
      progressBarColor={PALETTE[themeMode === 'dark' ? 0 : 1].interactive.success50}
      votingEnabled
      openVoteModal={noop}
    />
  );
};

export const VoteAgainst = () => {
  const { mode: themeMode } = React.useContext(ThemeContext);
  return (
    <VoteSummary
      label="Against"
      votedValueWei={new BigNumber('100000000000000000')}
      votedTotalWei={new BigNumber('200000000000000000')}
      voters={votes}
      progressBarColor={PALETTE[themeMode === 'dark' ? 0 : 1].interactive.error50}
      votingEnabled
      openVoteModal={noop}
    />
  );
};

export const Abstain = () => {
  const { mode: themeMode } = React.useContext(ThemeContext);
  return (
    <VoteSummary
      label="Abstain"
      votedValueWei={new BigNumber('0')}
      votedTotalWei={new BigNumber('200000000000000000')}
      progressBarColor={PALETTE[themeMode === 'dark' ? 0 : 1].text.secondary}
      votingEnabled
      openVoteModal={noop}
    />
  );
};
