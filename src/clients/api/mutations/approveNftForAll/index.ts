import { Wpunks } from 'types/contracts';

const approveNftForAll = ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: {
  tokenContract: Wpunks;
  accountAddress: string;
  spenderAddress: string;
}) => tokenContract.methods.setApprovalForAll(spenderAddress, true).send({ from: accountAddress });

export default approveNftForAll;
