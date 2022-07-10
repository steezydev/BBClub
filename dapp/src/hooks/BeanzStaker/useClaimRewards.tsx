import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useClaimRewards = (): [() => void, TransactionStatus] => {
  const { state, send } = useContractFunction(
    BeanzStakerContract,
    'claimRewards',
    {
      transactionName: 'ClaimRewards',
    }
  );

  const sendTrans = () => {
    send();
  };

  return [sendTrans, state];
};

export default useClaimRewards;
