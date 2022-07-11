import { BigNumber, utils } from 'ethers';
import React, { useEffect, useState } from 'react';

import Whitelist from '@/lib/utils/Whitelist';
import useMint from '@/hooks/BeanzDeployer/useMint';
import useWhitelistMint from '@/hooks/BeanzDeployer/useWhitelistMint';

interface MintWidgetProps {
  address?: string;
  tokenPrice?: BigNumber;
  totalSupply?: number;
  maxFree?: number;
  maxFreePerTx?: number;
  maxPerTx?: number;
  isWhitelistEnabled?: boolean;
  isPaused?: boolean;
}

export default function MintWidget({
  address = '',
  tokenPrice = BigNumber.from(0),
  totalSupply = 0,
  maxFree = 0,
  maxFreePerTx = 0,
  maxPerTx = 0,
  isWhitelistEnabled = false,
  isPaused = false,
}: MintWidgetProps) {
  const [mintAmount, setMintAmount] = useState(1);
  const [canMint, setCanMint] = useState(false);
  const [mintTokens] = useMint();
  const [whitelistMintTokens] = useWhitelistMint(address);

  useEffect(() => {
    const whitelistMint =
      (isWhitelistEnabled ?? false) && Whitelist.contains(address);

    setCanMint(!isPaused || whitelistMint);
  }, [isPaused, isWhitelistEnabled, address]);

  const incrementMintAmount = (): void => {
    setMintAmount((prev) =>
      Math.min(maxFree <= totalSupply ? maxPerTx : maxFreePerTx, prev + 1)
    );
  };

  const decrementMintAmount = (): void => {
    setMintAmount((prev: number) => Math.max(1, prev - 1));
  };

  const mint = async (): Promise<void> => {
    if (!isPaused) {
      mintTokens(mintAmount);
      return;
    }

    whitelistMintTokens(mintAmount);
  };

  return (
    <>
      {canMint ? (
        <div className='nes-container is-rounded flex w-full flex-col items-center justify-center gap-6 sm:w-fit'>
          <div className='flex flex-col items-center justify-center font-secondary md:block'>
            <span className='text-xs text-[#4a4949]'>Total price:</span>{' '}
            <span className='text-xl font-bold md:text-base'>
              {maxFree <= totalSupply
                ? utils.formatEther(tokenPrice.mul(mintAmount)) + ' ' + 'ETH'
                : 0 + ' ' + 'ETH'}
            </span>
          </div>

          <div className='flex w-full flex-col items-center gap-10 sm:w-fit sm:gap-6'>
            <div className='flex w-full items-center justify-between gap-7'>
              <button className='nes-btn' onClick={() => decrementMintAmount()}>
                -
              </button>
              <span className='font-secondary text-3xl sm:text-2xl'>
                {mintAmount}
              </span>
              <button className='nes-btn' onClick={() => incrementMintAmount()}>
                +
              </button>
            </div>
            <button
              className='nes-btn is-primary w-full sm:w-fit'
              onClick={() => mint()}
            >
              Mint
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
