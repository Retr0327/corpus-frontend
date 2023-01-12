import { memo } from 'react';
import Route from '@config/routes';
import { useRouter } from 'next/router';
import { useBoards } from '@services/boards';
import { Loader } from '@components/common/ui';
import CorpusForm from './Form';

function Corpus() {
  const router = useRouter();
  const { boards, isLoading, error } = useBoards();

  if (isLoading) {
    return <Loader />;
  }

  if (boards === undefined || error) {
    router.push(Route.serverError, { pathname: router.pathname });
    return null;
  }

  return <CorpusForm boards={boards} />;
}

export default memo(Corpus);
