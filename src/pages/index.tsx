import { NextPage } from 'next';
import { Boards } from 'types/corpus';
import getBoards from '@services/boards';
import { Container } from '@mantine/core';
import CorpusForm from '@components/pages/Corpus/Form';

type Props = { boards: Boards };

const Home: NextPage<Props> = (props) => {
  const { boards } = props;

  return (
    <Container size={700} my={40}>
      <CorpusForm boards={boards} />
    </Container>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const redirect = { redirect: { permanent: false, destination: '/500' } };
  const [result, error] = await getBoards();

  if (error || !result || result.status === 'failed') {
    return redirect;
  }

  return { props: { boards: result.data } };
};
