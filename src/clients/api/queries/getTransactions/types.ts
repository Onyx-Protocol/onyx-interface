export interface TransactionResponse {
  amount: number;
  blockNumber: number;
  category: string;
  createdAt: string;
  action: string;
  from: string;
  id: number;
  blockTimestamp: string | null;
  to: string;
  txHash: string;
  updatedAt: string;
  oTokenAddress: string;
}
