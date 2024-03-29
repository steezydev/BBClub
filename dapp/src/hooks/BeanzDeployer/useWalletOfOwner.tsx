import { useCall } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { useEffect, useState } from 'react';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useWalletOfOwner = (
  address: string | Falsy
): [number[] | undefined, Error | undefined] => {
  const [ids, setIds] = useState<number[] | undefined>();

  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'walletOfOwner',
      args: [address as string],
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
