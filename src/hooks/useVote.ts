import { CastVoteInput, useCastVote } from 'clients/api';

export type UseVoteParams = Partial<CastVoteInput>;

const useVote = ({ accountAddress }: { accountAddress: string }) => {
  const { mutateAsync: castVote, isLoading: isCastVoteLoading } = useCastVote({
    fromAccountAddress: accountAddress,
  });

  const isLoading = isCastVoteLoading;

  const vote = async ({ proposalId = 0, voteType = false }: UseVoteParams) =>
    castVote({
      proposalId,
      voteType,
    });

  return {
    isLoading,
    vote,
  };
};

export default useVote;
