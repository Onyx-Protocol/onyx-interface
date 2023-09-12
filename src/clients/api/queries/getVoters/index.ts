import config from 'config';

import getVotersSubGraph from 'utilities/getVotersSubGraph';

import formatToVoters from './formatToVoters';
import { GetVotersInput, GetVotersOutput } from './types';

export * from './types';

const getVoters = async (input: GetVotersInput): Promise<GetVotersOutput> => {
  const proposalVoters = await getVotersSubGraph(config.chainId, input);

  return formatToVoters(proposalVoters);
};

export default getVoters;
