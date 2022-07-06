import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function StakePage() {
  return (
    <Layout>
      <Seo templateTitle='Stake' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>Stake!</div>
        </section>
      </main>
    </Layout>
  );
}
