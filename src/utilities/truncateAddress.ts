export const truncateAddress = (address: string, start = 4, end = -4) => `${address.slice(0, start)}...${address.slice(end)}`;
