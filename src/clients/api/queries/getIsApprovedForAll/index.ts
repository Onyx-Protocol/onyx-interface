import { Wpunks } from 'types/contracts';

const getIsApprovedForAll = async ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: {
  tokenContract: Wpunks;
  accountAddress: string;
  spenderAddress: string;
}): Promise<boolean> => {
  const res = await tokenContract.methods.isApprovedForAll(accountAddress, spenderAddress).call();

  return res;
};

export default getIsApprovedForAll;
