import API from '@config/api';
import { SWRConfig } from 'swr';
import Route from '@config/routes';
import { Boards } from 'types/corpus';
import { Container } from '@mantine/core';
import { fetchBoards } from '@services/boards';
import Corpus from '@components/pages/Corpus/Home';
import type { NextPage, GetServerSideProps } from 'next';

type Props = { fallback: { [x: string]: Boards } };

const Home: NextPage<Props> = (props) => (
  <SWRConfig value={{ fallback: props.fallback }}>
    <Container size={700} my={40}>
      <Corpus />
    </Container>
  </SWRConfig>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = { redirect: { permanent: false, destination: Route.serverError } };
  const url = API.V1.corpus.boards;
  const boards = await fetchBoards(url);

  if (boards === null || boards.status === 'failed') {
    return redirect;
  }

  return {
    props: {
      fallback: {
        [url]: boards.data,
      },
    },
  };
};
