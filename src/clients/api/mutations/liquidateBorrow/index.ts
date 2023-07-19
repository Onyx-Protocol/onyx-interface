import { OEth20, OEthToken } from 'types/contracts';

const liquidateBorrow = ({
  oTokenContract,
  isNativeToken,
  borrower,
  oTokenCollateralAddress,
  repayAmount,
  accountAddress,
}: {
  oTokenContract: OEth20 | OEthToken;
  isNativeToken: boolean;
  borrower: string;
  oTokenCollateralAddress: string;
  repayAmount: string;
  accountAddress: string;
}) => {
  if (!oTokenContract) {
    return Promise.resolve(null);
  }
  if (isNativeToken) {
    return (oTokenContract as OEthToken).methods
      .liquidateBorrow(borrower, oTokenCollateralAddress)
      .send({ from: accountAddress, value: repayAmount });
  }
  return (oTokenContract as OEth20).methods
    .liquidateBorrow(borrower, repayAmount, oTokenCollateralAddress)
    .send({ from: accountAddress });
};
export default liquidateBorrow;
