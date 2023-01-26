import { OEth20, OEthToken } from 'types/contracts';

export interface GetOTokenInterestRateModelInput {
  oTokenContract: OEth20 | OEthToken;
}

export type GetOTokenInterestRateModelOutput = {
  contractAddress: string;
};

const getOTokenInterestRateModel = async ({
  oTokenContract,
}: GetOTokenInterestRateModelInput): Promise<GetOTokenInterestRateModelOutput> => {
  const contractAddress = await oTokenContract.methods.interestRateModel().call();

  return {
    contractAddress,
  };
};

export default getOTokenInterestRateModel;
