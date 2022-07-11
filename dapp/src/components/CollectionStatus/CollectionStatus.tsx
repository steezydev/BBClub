import React from 'react';

interface MintStatusProps {
  maxSupply?: number;
  totalSupply?: number;
  maxFree?: number;
  whitelistReserved?: number;
  isWhitelistEnabled?: boolean;
  isPaused?: boolean;
}

export default function MintStatus({
  maxSupply,
  totalSupply,
  maxFree,
  whitelistReserved,
  isWhitelistEnabled,
  isPaused,
}: MintStatusProps) {
  const isSaleOpen = () => {
    return isWhitelistEnabled === true || isPaused === false;
  };

  return (
    <div className='flex justify-start'>
      <div className='nes-container is-rounded flex flex-col items-center gap-8 bg-pattensBlue-100 px-24'>
        <div className='flex flex-col items-center gap-2 font-secondary'>
          <span className='text-s font-normal text-[#4a4949]'>Sale status</span>
          {isWhitelistEnabled != undefined && isPaused != undefined ? (
            <span className='text-lg font-bold'>
              {isSaleOpen() ? (
                <>{isWhitelistEnabled ? 'Whitelist only' : 'Open'}</>
              ) : (
                'Closed'
              )}
            </span>
          ) : (
            <span className='font-bold'>-</span>
          )}
        </div>

        <div className='flex flex-col justify-between gap-8 md:flex-row md:gap-20'>
          <div className='flex flex-col items-center gap-2 font-secondary'>
            <span className='text-s font-normal text-[#4a4949]'>
              Free supply
            </span>

            {totalSupply != undefined &&
            maxFree != undefined &&
            whitelistReserved != undefined ? (
              <>
                {totalSupply <= whitelistReserved + maxFree ? (
                  <span className='text-lg font-bold'>
                    {totalSupply}/{maxFree + whitelistReserved}
                  </span>
                ) : (
                  <span className='text-lg font-bold'>
                    {maxFree + whitelistReserved}/{maxFree + whitelistReserved}
                  </span>
                )}
              </>
            ) : (
              <span className='font-bold'>-</span>
            )}
          </div>

          <div className='flex flex-col items-center gap-2 font-secondary'>
            <span className='text-s font-normal text-[#4a4949]'>Supply</span>
            {totalSupply != undefined && maxFree != undefined ? (
              <span className='text-lg font-bold'>
                {totalSupply}/{maxSupply}
              </span>
            ) : (
              <span className='text-lg font-bold'>-</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
