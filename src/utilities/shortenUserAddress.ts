export const shortenUserAddress = (userAddress: string) =>
  `${userAddress.slice(0, 4)}...${userAddress.slice(-4, userAddress.length)}`;
