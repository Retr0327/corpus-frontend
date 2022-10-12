import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import ConcordanceTable from '@containers/Concordance';

const Concordance: NextPage = () => {
  const router = useRouter();
  const { e, page } = router.query as { e: string; page: string };

  return <ConcordanceTable page={page} e={e} />;
};

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
