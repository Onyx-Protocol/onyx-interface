const getProxies = async ({
  WPunksContract,
  accountAddress,
}: {
  WPunksContract: any;
  accountAddress: string;
}): Promise<string> => {
  const response = await WPunksContract.methods['proxyInfo(address)'](accountAddress).call();

  return response;
};

export default getProxies;
