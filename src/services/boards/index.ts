import { API } from '@config';
import { request } from '@utils';

const getBoards = async () => {
  try {
    const result = await request({ method: 'GET', url: API.external.boards });
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

export default getBoards;
