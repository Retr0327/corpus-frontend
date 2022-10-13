import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Container } from '@mantine/core';
import ConcordanceTable from '@containers/Concordance';

function Concordance() {
  const router = useRouter();
  const { e, page } = router.query as { e: string; page: string };

  return (
    <Container size={1200} my={40}>
      <ConcordanceTable e={e} page={page} />
    </Container>
  );
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
