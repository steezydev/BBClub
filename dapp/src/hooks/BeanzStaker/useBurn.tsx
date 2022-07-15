import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useBurn = (): [(tokenIds: number[]) => void, TransactionStatus] => {
  const { state, send } = useContractFunction(BeanzStakerContract, 'burn', {
    transactionName: 'Burn',
  });

  const sendTrans = (tokenIds: number[]) => {
    send(tokenIds);
  };

  return [sendTrans, state];
};

export default useBurn;
