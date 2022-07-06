import { TransactionStatus, useContractFunction } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';
import Whitelist from '@/lib/utils/Whitelist';

const useWhitelistMint = (
  address: string
): [(mintAmount: number) => void, TransactionStatus] => {
  const { state, send } = useContractFunction(
    BeanzDeployerContract,
    'whitelistMint',
    {
      transactionName: 'WhitelistMint',
    }
  );

  const sendTrans = (mintAmount: number) => {
    send(mintAmount, Whitelist.getProofForAddress(address));
  };

  return [sendTrans, state];
};

export default useWhitelistMint;
