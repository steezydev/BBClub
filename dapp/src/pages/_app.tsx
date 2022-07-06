import { DAppProvider } from '@usedapp/core';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { rinkebyConfig } from '@/lib/networks';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={rinkebyConfig}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
