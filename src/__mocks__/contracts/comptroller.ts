import { Comptroller } from 'types/contracts';

const comptrollerResponses: {
  getHypotheticalAccountLiquidity: Awaited<
    ReturnType<ReturnType<Comptroller['methods']['getHypotheticalAccountLiquidity']>['call']>
  >;
} = {
  getHypotheticalAccountLiquidity: {
    0: '100000000',
    1: '200000000',
    2: '300000000',
  },
};

export default comptrollerResponses;
