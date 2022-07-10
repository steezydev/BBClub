import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

import contractAddresses from '$/addresses';

const useSetApprovalForAll = (): [() => Promise<void>, TransactionStatus] => {
  const { state, send } = useContractFunction(
    BeanzDeployerContract,
    'setApprovalForAll',
    {
      transactionName: 'SetApprovalForAll',
    }
  );

  const sendTrans = async () => {
    await send(contractAddresses.BeanzStaker, true);
  };

  return [sendTrans, state];
};

export default useSetApprovalForAll;
