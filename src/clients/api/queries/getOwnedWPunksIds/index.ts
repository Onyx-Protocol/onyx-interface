import BigNumber from 'bignumber.js';
import { ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall';
import { getContractAddress } from 'utilities';

import wpunksAbi from 'constants/contracts/abis/wpunks.json';

const getOwnedWPunksIds = async ({ accountAddress, WPunksContract, multicall }: any): Promise<any> => {
  const wPunksBalance = await WPunksContract.methods.balanceOf(accountAddress).call();

  const contractCallContexts = new Array(Number(wPunksBalance)).fill(['0']).map((_v, _idx) => {
    const contractCallContext: ContractCallContext = {
      reference: `${getContractAddress('wpunks')}-${_idx}`,
      contractAddress: getContractAddress('wpunks'),
      abi: wpunksAbi,
      calls: [
        {
          reference: 'tokenOfOwnerByIndex',
          methodName: 'tokenOfOwnerByIndex',
          methodParameters: [accountAddress, _idx],
        },
      ],
    };
    return contractCallContext;
  });
  const unformattedResults = await multicall.call(contractCallContexts);
  const results: ContractCallReturnContext[] = Object.values(unformattedResults.results);

  const ownedFiIds = results.reduce((a: any, result) => {
    const returnContext = result.callsReturnContext[0];
    if (!returnContext.success) {
      return a;
    }
    const id = new BigNumber(returnContext.returnValues[0].hex).toString(10);
    return [...a, id];
  }, []);

  return ownedFiIds;
};

export default getOwnedWPunksIds;
