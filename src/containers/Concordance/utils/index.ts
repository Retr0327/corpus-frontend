import decode from '@utils/url';
import { CorpusQueries } from 'types';

function getPayload(page: string, e: string) {
  const decoded = decode(e);
  const params = new URLSearchParams(decoded as string);

  return {
    word: params.get('w'),
    media: params.get('m') === 'all' ? '' : params.get('m'),
    cqlEnable: params.get('c') === 'true',
    postType: params.get('p'),
    boards: params.get('b'),
    start: params.get('s'),
    end: params.get('e'),
    windowSize: params.get('win'),
    page: Number(page),
    fetchNumber: Number(params.get('f')),
  } as CorpusQueries;
}

export default getPayload;
