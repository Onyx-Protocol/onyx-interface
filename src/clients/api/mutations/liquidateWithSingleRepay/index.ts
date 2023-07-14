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
}: {
  liquidationProxyContract: any;
  isNativeToken: boolean;
  borrower: string;
  oTokenCollateralAddress: string;
  oTokenRepayAddress: string;
  repayAmount: string;
  seizeIndexes: (string | number)[];
  isClaimOToken: boolean;
  accountAddress: string;
}) => {
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
