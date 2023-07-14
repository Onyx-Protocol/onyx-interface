const approveNftForAll = ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: {
  tokenContract: any;
  accountAddress: string;
  spenderAddress: string;
}) => tokenContract.methods.setApprovalForAll(spenderAddress, true).send({ from: accountAddress });

export default approveNftForAll;
