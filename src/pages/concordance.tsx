import decode from '@utils/url';
import { CorpusQueries } from 'types';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ConcordanceTable from '@containers/Concordance';

function Concordance() {
  const router = useRouter();
  const { e, page } = router.query as { e: string; page: string };
  const decoded = decode(e);
  const params = new URLSearchParams(decoded as string);

  const payload = {
    word: params.get('w'),
    media: params.get('m') === 'all' ? '' : params.get('m'),
    cqlEnable: Boolean(params.get('c')),
    postType: params.get('p'),
    boards: params.get('b'),
    start: params.get('s'),
    end: params.get('e'),
    windowSize: params.get('win'),
    page: Number(page),
    fetchNumber: Number(params.get('f')),
  } as CorpusQueries;

  return <ConcordanceTable payload={payload} />;
}

export default Concordance;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const redirect = { redirect: { permanent: false, destination: '/' } };
  const { page, e } = query;

  if (page === undefined || e === undefined) {
    return redirect;
  }

  return { props: {} };
};
