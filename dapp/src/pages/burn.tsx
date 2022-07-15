import { useEthers } from '@usedapp/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useIsApprovedForAll from '@/hooks/BeanzDeployer/useIsApprovedForAll';
import useWalletOfOwner from '@/hooks/BeanzDeployer/useWalletOfOwner';
import useBurnPaused from '@/hooks/BeanzStaker/useBurnPaused';
import useStake from '@/hooks/BeanzStaker/useStake';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Stake from '@/components/Stake/Stake';
import StakeInfo from '@/components/StakeInfo/StakeInfo';

import { TNftData } from '@/types/nft.types';

export default function BurnPage() {
  const { account } = useEthers();
  const [mintedTokens] = useWalletOfOwner(account);

  const [mintedTokensData, setMintedTokensData] = useState<TNftData[]>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [isApprovedForAll] = useIsApprovedForAll(account);
  const [burnPaused] = useBurnPaused();

  const [stake, stakeState] = useStake();

  useEffect(() => {
    if (mintedTokens != undefined) {
      getNftsData(mintedTokens).then((data) => {
        setMintedTokensData(data);
      });
    }
  }, [mintedTokens]);

  const handleStake = async (ids: number[]) => {
    if (ids.length <= 0) return undefined;
    // call to stake()
    stake(ids);
  };

  useEffect(() => {
    if (!isApprovedForAll && isApprovedForAll != undefined)
      setErrorMessage('Beanz need approval...');
    if (burnPaused ?? false) setErrorMessage('The burning is paused...');
  }, [burnPaused, isApprovedForAll]);

  return (
    <Layout>
      <Seo templateTitle='Burn' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <StakeInfo address={account} />
            <div>
              <Stake
                title='Burn'
                description='Select which Beanz to burn'
                actionName='Burn'
                data={mintedTokensData}
                actionVariant='error'
                action={handleStake}
                disableAction={
                  (stakeState.status != 'None' &&
                    stakeState.status != 'Success' &&
                    stakeState.status != 'Exception') ||
                  (burnPaused ?? false)
                }
                emptyMessage='You don`t have any Beanz in your wallet :('
                errorMessage={errorMessage}
                needsApproval={
                  !isApprovedForAll && isApprovedForAll != undefined
                }
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
