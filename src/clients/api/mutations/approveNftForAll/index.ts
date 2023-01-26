const approveNftForAll = ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: any): Promise<any> =>
  tokenContract.methods.setApprovalForAll(spenderAddress, true).send({ from: accountAddress });

export default approveNftForAll;
