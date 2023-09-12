import { Wpunks } from 'types/contracts';

const getProxies = async ({
  WPunksContract,
  accountAddress,
}: {
  WPunksContract: Wpunks;
  accountAddress: string;
}): Promise<string> => {
  const response = await WPunksContract.methods.proxyInfo(accountAddress).call();

  return response;
};

export default getProxies;
