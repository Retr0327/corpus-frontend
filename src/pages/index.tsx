import { memo } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Loader } from '@components/UI';
import getBoards from '@services/boards';
import CorpusForm from '@containers/Form';
import { Container } from '@mantine/core';

const Home: NextPage = () => {
  const router = useRouter();
  const { boards, isError, isLoading } = getBoards();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !boards) {
    router.push('/500', { pathname: router.pathname });
    return null;
  }

  return (
    <Container size={700} my={40}>
      <CorpusForm boards={boards.data} />
    </Container>
  );
};

export default memo(Home);
