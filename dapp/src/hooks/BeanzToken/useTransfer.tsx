import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { BigNumberish } from 'ethers';

import { BeanzTokenContract } from '@/lib/contractsProvider';

const useTransfer = (): [
  (toAddress: string, value: BigNumberish) => void,
  TransactionStatus
] => {
  const { state, send } = useContractFunction(BeanzTokenContract, 'transfer', {
    transactionName: 'Transfer',
  });

  const sendTrans = (toAddress: string, value: BigNumberish) => {
    send(toAddress, value);
  };

  return [sendTrans, state];
};

export default useTransfer;
