const liquidateWithSingleRepay = ({
  liquidationProxyContract,
  isNativeToken,
  borrower,
  oTokenCollateralAddress,
  oTokenRepayAddress,
  repayAmount,
  seizeIndexes,
  isClaimOToken,
  accountAddress,
}: any): Promise<any> => {
  if (isNativeToken) {
    return liquidationProxyContract.methods
      .liquidateWithSingleRepayV2(
        borrower,
        oTokenCollateralAddress,
        oTokenRepayAddress,
        repayAmount,
        seizeIndexes,
        isClaimOToken,
      )
      .send({ from: accountAddress, value: repayAmount });
  }
  return liquidationProxyContract.methods
    .liquidateWithSingleRepayV2(
      borrower,
      oTokenCollateralAddress,
      oTokenRepayAddress,
      repayAmount,
      seizeIndexes,
      isClaimOToken,
    )
    .send({ from: accountAddress });
};
export default liquidateWithSingleRepay;
