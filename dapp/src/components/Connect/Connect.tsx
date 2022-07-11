import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import React from 'react';

import { shortenHex } from '@/lib/helper';
import useBeanzBalance from '@/hooks/BeanzToken/useBeanzBalance';

import Button from '@/components/buttons/Button';

export default function Connect() {
  const { activateBrowserWallet, account, error } = useEthers();
  const tokenBalance = useBeanzBalance(account);

  if (account) {
    return (
      <div className='flex items-center gap-6'>
        <Link href='/wallet'>
          <div className='nes-badge is-splited nes-pointer z-20 order-1 flex w-fit items-center'>
            <span className='is-primary static w-fit px-4 font-secondary text-base font-semibold'>
              {shortenHex(account)}
            </span>
            <span className='is-dark static w-fit px-3 font-secondary text-base font-semibold'>
              {tokenBalance} BBC
            </span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className='text-center'>
        <Button variant='primary' onClick={activateBrowserWallet}>
          Connect
        </Button>
      </div>

      {error && <div className='nes-text is-error'>{error.message}</div>}
    </div>
  );
}
