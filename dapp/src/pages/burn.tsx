import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function BurnPage() {
  return (
    <Layout>
      <Seo templateTitle='Burn' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'></div>
        </section>
      </main>
    </Layout>
  );
}
