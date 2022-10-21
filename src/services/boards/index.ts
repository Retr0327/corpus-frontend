import useSWR from 'swr';
import API from '@config/api';
import { Boards } from 'types';
import request from '@utils/request';

const getBoards = () => {
  const { data, error } = useSWR<Boards>(API.boards, (url) => request({ url, method: 'GET' }));

  return { boards: data, isLoading: !error && !data, isError: error };
};

export default getBoards;
