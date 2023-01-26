const getIsApprovedForAll = async ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: any): Promise<any> => {
  const res = await tokenContract.methods.isApprovedForAll(accountAddress, spenderAddress).call();

  return res;
};

export default getIsApprovedForAll;
