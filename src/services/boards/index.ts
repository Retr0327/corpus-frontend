import API from '@config/api';
import request from '@utils/request';

const getBoards = async () => {
  try {
    const result = await request({ method: 'GET', url: API.boards });
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

export default getBoards;
