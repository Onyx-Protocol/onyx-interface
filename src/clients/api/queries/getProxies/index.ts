const getProxies = async ({ WPunksContract, accountAddress }: any): Promise<string> => {
  const response = await WPunksContract.methods['proxyInfo(address)'](accountAddress).call();

  return response;
};

export default getProxies;
