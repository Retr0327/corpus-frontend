import { KeyedMutator } from 'swr';
import { Response, BlacklabResponse } from 'types';

type ResponseType = Response<BlacklabResponse> | null;

export type Props = {
  e: string;
  page: number;
  fetchNumber: number;
  numberOfHits: number;
  mutate: KeyedMutator<ResponseType>;
};
