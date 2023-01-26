import BigNumber from 'bignumber.js';
import { ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall';
import { getContractAddress } from 'utilities';

import fiPunkAbi from 'constants/contracts/abis/fiPunk.json';

const getOwnedFiPunkIds = async ({ accountAddress, fiPunkContract, multicall }: any): Promise<any> => {
  const fiPunkBalance = await fiPunkContract.methods.balanceOf(accountAddress).call();

  const contractCallContexts = new Array(Number(fiPunkBalance)).fill(['0']).map((_v, _idx) => {
    const contractCallContext: ContractCallContext = {
      reference: `${getContractAddress('fiPunk')}-${_idx}`,
      contractAddress: getContractAddress('fiPunk'),
      abi: fiPunkAbi,
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

export default getOwnedFiPunkIds;
