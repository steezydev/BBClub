import { useCall } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { useEffect, useState } from 'react';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useGetStakedTokens = (
  address: string | Falsy
): [number[] | undefined, Error | undefined] => {
  const [ids, setIds] = useState<number[] | undefined>();

  const { value, error } =
    useCall({
      contract: BeanzStakerContract,
      method: 'getStakedTokens',
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

export default useGetStakedTokens;
