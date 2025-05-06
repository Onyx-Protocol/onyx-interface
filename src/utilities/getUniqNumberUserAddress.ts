export const getUniqNumberUserAddress = (userAddress: string) => {
  const uniqNumberUserAddress =
    userAddress
      .split('')
      // eslint-disable-next-line no-restricted-globals
      .filter(char => !isNaN(+char))
      .join('')
      .slice(0, 5) || '0';
  const iconIndex = parseInt(uniqNumberUserAddress, 10) % 10;

  return iconIndex;
};
