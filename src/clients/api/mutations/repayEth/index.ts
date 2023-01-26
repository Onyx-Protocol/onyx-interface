import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import Web3 from 'web3';
import type { TransactionReceipt } from 'web3-core/types';

import { getMaximillionContract, getOTokenContract } from 'clients/contracts';
import { OETH_TOKENS } from 'constants/tokens';

export interface RepayEthInput {
  web3: Web3;
  fromAccountAddress: string;
  amountWei: BigNumber;
  isRepayingFullLoan?: boolean;
}

export type RepayEthOutput = TransactionReceipt;

export const REPAYMENT_ETH_BUFFER_PERCENTAGE = 0.001;

const repayEth = async ({
  web3,
  fromAccountAddress,
  amountWei,
  isRepayingFullLoan = false,
}: RepayEthInput): Promise<RepayEthOutput> => {
  let resp: TransactionReceipt;

  // If we're repaying a full loan, we need to call the Maximillion contract to
  // do so. If we partially repay a loan, we need to send the ETH amount to
  // repay to the oETH contract
  if (isRepayingFullLoan) {
    const maximillionContract = getMaximillionContract(web3);
    const amountWithBuffer = amountWei.multipliedBy(1 + REPAYMENT_ETH_BUFFER_PERCENTAGE);

    resp = await maximillionContract.methods
      .repayBehalfExplicit(fromAccountAddress, OETH_TOKENS.eth.address)
      .send({
        from: fromAccountAddress,
        value: amountWithBuffer.toFixed(0),
      });
  } else {
    const oEthContract = getOTokenContract('eth', web3);
    const contractData = oEthContract.methods.repayBorrow().encodeABI();

    resp = await web3.eth.sendTransaction({
      from: fromAccountAddress,
      to: OETH_TOKENS.eth.address,
      value: amountWei.toFixed(),
      data: contractData,
    });
  }

  return checkForTokenTransactionError(resp);
};

export default repayEth;
