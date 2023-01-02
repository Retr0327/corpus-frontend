import useSWR from 'swr';
import API from '@config/api';
import request from '@utils/request';
import { Response } from 'types';
import { ConcordanceRequestBody, Concordance } from 'types/corpus';

type ResponseType = Response<Concordance> | null;

const useConcordance = (payload: ConcordanceRequestBody) => {
  const { data, error, mutate } = useSWR<ResponseType>(API.V1.corpus.concordance, (url) =>
    request({ url, method: 'POST', payload })
  );

  return { concordance: data, isLoading: !error && !data, isError: error, mutate };
};

export default useConcordance;
