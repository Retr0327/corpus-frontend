import Route from '@config/routes';
import { decodeURL } from '@utils/url';
import { Container } from '@mantine/core';
import { NextPage, GetServerSideProps } from 'next';
import { ConcordancePageProps } from 'types/corpus';
import ConcordanceTable from '@components/pages/Corpus/Concordance';

const Concordance: NextPage<ConcordancePageProps> = (props) => {
  const { payload } = props;

  return (
    <Container size={1200} my={40}>
      <ConcordanceTable payload={payload} />
    </Container>
  );
};

export default Concordance;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const redirect = { redirect: { permanent: false, destination: Route.home } };
  const { page, pos, e } = query as { page?: string; pos?: string; e?: string };
  const invalidQuery = page === undefined || pos === undefined || e === undefined;

  if (invalidQuery) return redirect;

  const payload = decodeURL(e, page);

  if (payload === false) return redirect;

  return { props: { payload } };
};
