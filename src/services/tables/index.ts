import useSWR from 'swr';
import API from '@config/api';
import request from '@utils/request';
import { Response, CorpusQueries, BlacklabResponse } from 'types';

type ResponseType = Response<BlacklabResponse> | null;

const getTable = (payload: CorpusQueries) => {
  const { data, error, mutate } = useSWR<ResponseType>(API.corpus, (url) =>
    request({ url, method: 'POST', payload })
  );

  return { corpusData: data, isLoading: !error && !data, isError: error, mutate };
};

export default getTable;
