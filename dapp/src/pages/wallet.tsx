import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useWalletOfOwner from '@/hooks/BeanzDeployer/useWalletOfOwner';

import Button from '@/components/buttons/Button';
import Gallery from '@/components/Gallery/Gallery';
import Layout from '@/components/layout/Layout';
import Loader from '@/components/Loader/Loader';
import Seo from '@/components/Seo';
import WalletWidget from '@/components/WalletWidget/WalletWidget';

import { TNftData } from '@/types/nft.types';

export default function WalletPage() {
  const { account, deactivate } = useEthers();
  const [mintedTokens] = useWalletOfOwner(account);

  const [mintedTokensData, setMintedTokensData] = useState<TNftData[]>();

  useEffect(() => {
    if (mintedTokens != undefined) {
      getNftsData(mintedTokens).then((data) => {
        setMintedTokensData(data);
      });
    }
  }, [mintedTokens]);

  return (
    <Layout>
      <Seo templateTitle='Wallet' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <div className='flex justify-between'>
              <h1>Wallet</h1>
              {account ? (
                <Button onClick={() => deactivate()} variant='normal'>
                  Disconnect
                </Button>
              ) : null}
            </div>
            {account ? (
              <>
                <div className='flex justify-center'>
                  <WalletWidget address={account} />
                </div>
                <div className='mt-14'>
                  <div className='flex justify-between'>
                    <h3>Minted Beanz</h3>
                    <Link href='/stake'>
                      <Button variant='warning'>Stake!</Button>
                    </Link>
                  </div>
                  {mintedTokensData != undefined ? (
                    mintedTokensData.length > 0 ? (
                      <Gallery>
                        {mintedTokensData?.map((data, index) => (
                          <Gallery.Item
                            key={index}
                            name={data.name}
                            rank={data.rank}
                            image={data.image}
                          />
                        ))}
                      </Gallery>
                    ) : (
                      <div className='mt-9 text-center'>
                        You don`t have any Beanz minted
                      </div>
                    )
                  ) : (
                    <div className='mt-9 text-center'>
                      <Loader />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className=''>
                <Loader message='Connect your wallet first' />
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
