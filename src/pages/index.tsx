import getBoards from '@services/boards';
import CorpusForm from '@containers/Form';
import { GetServerSideProps } from 'next';
import { ColorSchemeToggle } from '@components/UI';
import { Container, Title, Group, Text, createStyles } from '@mantine/core';

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

type Board = { boards: { [key in string]: any } };

function Home({ boards }: Board) {
  const { classes } = useStyles();

  return (
    <Container size={700} my={40}>
      <Group position="right" mt={5}>
        <ColorSchemeToggle />
      </Group>
      <Title className={classes.title}>Taiwan Social Media Corpus</Title>
      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          A corpus of PTT and Dcard.
        </Text>
      </Container>
      <CorpusForm boards={boards} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Board> = async () => {
  const redirect = { redirect: { permanent: false, destination: '/500' } };
  const [result, error] = await getBoards();

  if (error || result.status === 'failed') {
    return redirect;
  }

  return { props: { boards: result.data } };
};

export default Home;
