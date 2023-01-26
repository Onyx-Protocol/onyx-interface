import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import Web3 from 'web3';
import type { TransactionReceipt } from 'web3-core';

import { OETH_TOKENS } from 'constants/tokens';
import { OEthToken } from 'types/contracts';

export interface SupplyEthInput {
  tokenContract: OEthToken;
  web3: Web3;
  account: string;
  amountWei: BigNumber;
}

export type SupplyEthOutput = TransactionReceipt;

const supplyEth = async ({
  web3,
  tokenContract,
  account,
  amountWei,
}: SupplyEthInput): Promise<SupplyEthOutput> => {
  const contractData = tokenContract.methods.mint().encodeABI();
  const tx = {
    from: account,
    to: OETH_TOKENS.eth.address,
    value: amountWei.toFixed(),
    data: contractData,
  };

  const resp = await web3.eth.sendTransaction(tx);
  return checkForTokenTransactionError(resp);
};

export default supplyEth;
