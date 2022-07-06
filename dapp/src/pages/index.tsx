import { useEthers } from '@usedapp/core';
import * as React from 'react';

import BeanBubble from '@/components/BeanBubble/BeanBubble';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { Profile } from '@/components/Profile/Profile';
import Seo from '@/components/Seo';
import Timeline from '@/components/Timeline/Timeline';

export default function HomePage() {
  const { account } = useEthers();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-body'>
          <div className='layout mt-32 flex min-h-[50vh] flex-col items-center text-center'>
            <BeanBubble>
              {!account ? (
                <div>
                  Hi! Wellcome to{' '}
                  <span className='font-special text-3xl'>
                    Based Beanz Club
                  </span>
                  !
                  <br />
                  Please, connect your wallet to get started!
                </div>
              ) : (
                <div className='mb-4'>
                  Perfect! Now you are all set and ready to{' '}
                  <UnstyledLink className='nes-text is-primary' href='/mint'>
                    mint
                  </UnstyledLink>
                  !
                  <br />
                  <br />
                  Your address is:
                </div>
              )}
              <div>
                <Profile />
              </div>
            </BeanBubble>
          </div>
        </section>
        <section
          id='about'
          className='layout mt-14 flex min-h-[50vh] items-center'
        >
          <div className='nes-container is-rounded font-text shadow-2xl'>
            <h1>About</h1>
            <p>
              BBC genesis #0 public mint - is the first stage of building strong
              community-corellated ecosystem. Our main goal is to provide real
              value to the tokenowners straight after mint and, especially, in
              mid & long term. Due to the new, sometimes unstable market
              conditions, our immediate tasks include staking mode & LP
              development and community building.
            </p>
          </div>
        </section>
        <section
          id='roadmap'
          className='layout mx-auto mt-28 h-full min-h-[50vh] w-full'
        >
          <div>
            <h1>Roadmap</h1>
            <Timeline>
              <Timeline.Item
                position='right'
                title='Prepare phase'
                point='May'
                className='bg-success-100'
              >
                Our team came up with the idea of BBC as first step into new not
                market reality in may `22. We worked hard on Solana industry
                blockchain development in non-fungible industry and decided to
                broaden our horizons as creators & artists. We mark P - the
                Performance as the main goal of any public-related «art». Based
                Beanz — is your personal invitation to our ambitious party.
              </Timeline.Item>
              <Timeline.Item
                position='left'
                point='June'
                title='Staking release'
                className=''
              >
                NFT staking mode in BBC ecosystem is a way to earn income &
                benefits through Proof-of-Stake mechanism. POS in NFT segment
                allows to distribute the liquidity, and community-related
                utilities such as accesses to other collections, passes,
                whitelists, etc. BBC staking release is planned on June. The
                mechanic will be available for holders through the website.
              </Timeline.Item>
              <Timeline.Item
                position='right'
                title='LP & marketplace development'
                className=''
              >
                Genesis #0 mint revenue will be distributed strictly up to our
                economic model. Part of the revenue will be spent on our
                community development: DAO passes, special tools & custom tools.
                Other part will create a liquidity pool - fundamentally
                important for clear staking mode, marketplace goods and,
                especially, community wallet for future IDAO.
              </Timeline.Item>
              <Timeline.Item
                position='left'
                title='OG & Alpha tickets distribution'
                className=''
              >
                - 500 OG tickets <br />- 500 Alpha tickets
              </Timeline.Item>
              <Timeline.Item
                position='right'
                title='Pending...'
                point='July'
                className=''
              >
                ???
              </Timeline.Item>
            </Timeline>
          </div>
        </section>
      </main>
    </Layout>
  );
}
