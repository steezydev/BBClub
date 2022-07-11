import { utils } from 'ethers';
import React, { useState } from 'react';

import { shortenHex } from '@/lib/helper';
import useBeanzBalance from '@/hooks/BeanzToken/useBeanzBalance';
import useTransfer from '@/hooks/BeanzToken/useTransfer';

import Button from '@/components/buttons/Button';

interface WalletWidgetProps {
  address: string;
}

export default function WalletWidget({ address }: WalletWidgetProps) {
  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState('');
  const tokenBalance = useBeanzBalance(address);
  const [transfer, transferState] = useTransfer();

  const handleTransfer = () => {
    if (toAddress == '' || value == '') return undefined;

    transfer(toAddress, utils.parseUnits(value, 18));
    setToAddress('');
    setValue('');
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    setToAddress(address);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <div className='nes-container is-rounded flex flex-col items-center justify-center gap-10'>
      <div className='flex w-full flex-col items-center justify-center gap-5 border-b-4 border-dashed pb-5'>
        <div className='nes-badge nes-pointer z-20 flex w-fit items-center'>
          <span className='is-primary static w-fit px-4  text-lg font-semibold'>
            {shortenHex(address, 8)}
          </span>
        </div>

        <div className='nes-badge nes-pointer z-20 flex w-fit items-center'>
          <span className='is-dark static w-fit px-4'>
            <span className='font-semibold'>{tokenBalance}</span>{' '}
            <span className='text-sm font-thin'>BBC</span>
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='w-full'>
          <div className='nes-field is-inline'>
            <label htmlFor='inline_field'>Address:</label>
            <div>
              <input
                value={toAddress}
                onChange={handleAddressChange}
                type='text'
                id='inline_field'
                className='nes-input'
                placeholder='Public address'
              />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='nes-field is-inline'>
            <label htmlFor='inline_field'>Amount:</label>
            <div>
              <input
                value={value}
                onChange={handleValueChange}
                type='text'
                id='inline_field'
                className='nes-input'
                placeholder='0'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-6'>
        <Button
          disabled={toAddress == '' || value == ''}
          onClick={handleTransfer}
          variant='primary'
        >
          Transfer
        </Button>
        {transferState.transaction != undefined && (
          <span className='nes-text is-primary font-secondary'>
            <a
              target='_blank'
              href={`https://rinkeby.etherscan.io/tx/${transferState.transaction?.hash}`}
              rel='noreferrer'
            >
              View on Etherscan
            </a>
          </span>
        )}
      </div>
    </div>
  );
}
