import { ComponentMeta } from '@storybook/react';
import BigNumber from 'bignumber.js';
import noop from 'noop-ts';
import React, { useEffect, useState } from 'react';

import voterHistory from '__mocks__/models/voterHistory';
import formatVoterHistoryResponse from 'clients/api/queries/getVoterHistory/formatVoterHistoryResponse';
import { NULL_ADDRESS } from 'constants/address';
import { withRouter } from 'stories/decorators';

import { VoterDetailsUi } from '.';

export default {
  title: 'Pages/VoterDetails',
  component: VoterDetailsUi,
  decorators: [withRouter],
} as ComponentMeta<typeof VoterDetailsUi>;

export const Default = () => {
  const [voterHistoryFetched, setVoterHistoryFetched] = useState<
    Awaited<ReturnType<typeof formatVoterHistoryResponse>> | undefined
  >();

  useEffect(() => {
    voterHistory.then(vh => {
      setVoterHistoryFetched(vh);
    });
  }, []);

  return (
    <VoterDetailsUi
      balanceWei={new BigNumber(912512333)}
      delegateCount={12}
      votesWei={new BigNumber(912512333)}
      address={NULL_ADDRESS}
      voterHistory={voterHistoryFetched?.voterHistory}
      setCurrentHistoryPage={noop}
      total={60}
      limit={6}
      isHistoryFetching={false}
    />
  );
};
