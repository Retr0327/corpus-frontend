import Head from 'next/head';
import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { ColorScheme } from '@mantine/core';
import DarkThemeContext from '@contexts/DarkTheme';
import { GetServerSidePropsContext } from 'next';

function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps, colorScheme } = props;

  return (
    <>
      <Head>
        <title>Taiwan Social Media Corpus</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <DarkThemeContext colorScheme={colorScheme}>
        <Component {...pageProps} />
      </DarkThemeContext>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default App;
