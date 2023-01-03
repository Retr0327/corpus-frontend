import { memo, useState } from 'react';
import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { Loader } from '@components/common/ui';
import useConcordance from '@services/concordance';
import { ConcordancePageProps, ConcordanceParams } from 'types/corpus';
import Table from './Table';
import ErrorCQL from './Error';
import NoResult from './NoResult';
import Pagination from './Pagination';
import HelperButtons from './Buttons';

function ConcordanceTable(props: ConcordancePageProps) {
  const { payload } = props;
  const router = useRouter();
  const { pos, e } = router.query as ConcordanceParams;
  const [showPos, setShowPos] = useState(pos === 'true');
  const { concordance, isError, isLoading, mutate } = useConcordance(payload);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !concordance || concordance.msg === 'internal server error') {
    router.push('/500', { pathname: router.pathname });
    return null;
  }

  if (concordance.msg === 'no hit') return <NoResult />;
  if (concordance.status === 'failed') return <ErrorCQL message={concordance.msg} />;

  return (
    <>
      <HelperButtons setShowPos={setShowPos} showPos={showPos} />
      <Table data={concordance.data} showPos={showPos} />
      <Center mt={30}>
        <Pagination
          e={e}
          showPos={pos === 'true'}
          numberOfHits={concordance.data.summary.numberOfHits}
          page={payload.page}
          fetchNumber={payload.fetchNumber}
          mutate={mutate}
        />
      </Center>
    </>
  );
}

export default memo(ConcordanceTable);
