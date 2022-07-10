import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useWithdraw = (): [(tokenIds: number[]) => void, TransactionStatus] => {
  const { state, send } = useContractFunction(BeanzStakerContract, 'withdraw', {
    transactionName: 'Withdraw',
  });

  const sendTrans = (tokenIds: number[]) => {
    send(tokenIds);
  };

  return [sendTrans, state];
};

export default useWithdraw;
