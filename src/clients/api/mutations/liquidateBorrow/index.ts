const liquidateBorrow = ({
  oTokenContract,
  isNativeToken,
  borrower,
  oTokenCollateralAddress,
  repayAmount,
  accountAddress,
}: any): Promise<any> => {
  if (!oTokenContract) {
    return Promise.resolve(null);
  }
  if (isNativeToken) {
    return oTokenContract.methods
      .liquidateBorrow(borrower, oTokenCollateralAddress)
      .send({ from: accountAddress, value: repayAmount });
  }
  return oTokenContract.methods
    .liquidateBorrow(borrower, repayAmount, oTokenCollateralAddress)
    .send({ from: accountAddress });
};
export default liquidateBorrow;
