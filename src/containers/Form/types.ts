import { CorpusQueries } from 'types';

export type FormValues = Omit<CorpusQueries, 'page' | 'start' | 'end' | 'windowSize'> & {
  start: number;
  end: number;
  windowSize: number;
};
