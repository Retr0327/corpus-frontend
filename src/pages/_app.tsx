import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { GetServerSidePropsContext } from 'next';
import DarkThemeContext from '@contexts/DarkTheme';
import { ColorSchemeToggle } from '@components/common/ui';
import { Container, Title, Group, Text, createStyles, ColorScheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

function App(props: AppProps & { colorScheme: ColorScheme }) {
  const router = useRouter();
  const { classes } = useStyles();
  const { Component, pageProps, colorScheme } = props;

  return (
    <>
      <Head>
        <title>Taiwan Social Media Corpus</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          rel="shortcut icon"
          href={`${router.basePath}/favicon.ico`}
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="shortcut icon"
          href={`${router.basePath}/favicon.svg`}
          type="image/svg+xml"
          sizes="any"
        />
      </Head>
      <DarkThemeContext colorScheme={colorScheme}>
        <Container size={700} mt={70}>
          <Group position="right" mt={5}>
            <ColorSchemeToggle />
          </Group>
          <Title className={classes.title}>Taiwan Social Media Corpus</Title>
          <Container size={560} p={0}>
            <Text size="sm" className={classes.description}>
              A corpus of PTT and Dcard.
            </Text>
          </Container>
        </Container>
        <Component {...pageProps} />
      </DarkThemeContext>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default App;
