import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useMint = (): [(mintAmount: number) => void, TransactionStatus] => {
  const { state, send } = useContractFunction(BeanzDeployerContract, 'mint', {
    transactionName: 'Mint',
  });

  const sendTrans = (mintAmount: number) => {
    send(mintAmount);
  };

  return [sendTrans, state];
};

export default useMint;
