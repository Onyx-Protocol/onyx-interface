const getProxies = async ({ fiPunkContract, accountAddress }: any): Promise<string> => {
  const response = await fiPunkContract.methods['_proxies(address)'](accountAddress).call();

  return response;
};

export default getProxies;
