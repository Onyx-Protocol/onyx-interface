import { useMemo } from 'react';
import { Token } from 'types';
import type { TransactionReceipt } from 'web3-core/types';

import {
  useApproveNftForAll,
  useApproveToken,
  useGetAllowance,
  useGetIsApprovedForAll,
} from 'clients/api';

interface UseTokenApprovalInput {
  token: Token;
  spenderAddress: string;
  accountAddress?: string;
  farmRefresh?: boolean;
}

interface UseTokenApprovalOutput {
  isTokenApproved: boolean | undefined;
  isTokenApprovalStatusLoading: boolean;
  approveToken: () => Promise<TransactionReceipt | undefined>;
  isApproveTokenLoading: boolean;
}

// TODO: add tests

const useTokenApproval = ({
  token,
  spenderAddress,
  accountAddress,
  farmRefresh,
}: UseTokenApprovalInput): UseTokenApprovalOutput => {
  const { data: getTokenAllowanceData, isLoading: isTokenApprovalStatusLoading } = useGetAllowance(
    {
      accountAddress: accountAddress || '',
      spenderAddress,
      token,
    },
    {
      enabled: !!accountAddress && !token.isNative,
    },
  );

  const { data: getNftAllowanceData, isLoading: isNftApprovalStatusLoading }: any =
    useGetIsApprovedForAll(
      {
        accountAddress: accountAddress || '',
        spenderAddress,
        token,
      },
      {
        enabled: !!accountAddress && !token.isNative,
      },
    );

  const isTokenApproved = useMemo(() => {
    if (token.decimals === 0) {
      return getNftAllowanceData;
    }
    if (token.isNative) {
      return true;
    }

    if (!getTokenAllowanceData) {
      return undefined;
    }

    return getTokenAllowanceData.allowanceWei.isGreaterThan(0);
  }, [token.isNative, getNftAllowanceData, getTokenAllowanceData]);

  const { mutateAsync: approveTokenMutation, isLoading: isApproveTokenLoading } = useApproveToken({
    token,
    farmRefresh,
  });

  const { mutateAsync: approveNftForAllMutation, isLoading: isApproveNftTokenLoading } =
    useApproveNftForAll({
      token,
      accountAddress,
      spenderAddress,
    });

  const approveToken = async () => {
    if (accountAddress) {
      if (token.decimals === 0) {
        return approveNftForAllMutation();
      }
      return approveTokenMutation({
        accountAddress,
        spenderAddress,
      });
    }
  };

  return {
    isTokenApproved,
    isTokenApprovalStatusLoading:
      token.decimals !== 0 ? isTokenApprovalStatusLoading : isNftApprovalStatusLoading,
    isApproveTokenLoading: token.decimals !== 0 ? isApproveTokenLoading : isApproveNftTokenLoading,
    approveToken,
  };
};

export default useTokenApproval;
