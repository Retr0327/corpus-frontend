import getBoards from '@services/boards';
import CorpusForm from '@containers/Form';
import { GetServerSideProps } from 'next';

type Board = { boards: { [key in string]: any } };

function Home({ boards }: Board) {
  return <CorpusForm boards={boards} />;
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
