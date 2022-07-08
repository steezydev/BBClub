import { useCall } from '@usedapp/core';
import { useEffect, useState } from 'react';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useWalletOfOwner = (
  address: string | undefined
): [number[] | undefined, Error | undefined] => {
  const [ids, setIds] = useState<number[] | undefined>();

  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'walletOfOwner',
      args: [address ?? ''],
    }) ?? {};

  useEffect(() => {
    const idArray = value?.[0].map((id) => {
      return id.toNumber();
    });

    setIds(idArray);
  }, [value]);

  return [ids, error];
};

export default useWalletOfOwner;
