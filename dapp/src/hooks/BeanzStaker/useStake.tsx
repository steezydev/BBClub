import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useStake = (): [(tokenIds: number[]) => void, TransactionStatus] => {
  const { state, send } = useContractFunction(BeanzStakerContract, 'stake', {
    transactionName: 'Stake',
  });

  const sendTrans = (tokenIds: number[]) => {
    send(tokenIds);
  };

  return [sendTrans, state];
};

export default useStake;
