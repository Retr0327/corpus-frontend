export type HTTPMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'CONNECT'
  | 'TRACE';

export type Request<T> = {
  url: string;
  method: HTTPMethods;
  payload?: T;
};

export interface Response<ResData = {}> {
  status: 'success' | 'failed';
  data: ResData;
  msg?: string;
}

export interface CorpusQueries {
  word: string;
  media: string;
  cqlEnable: boolean;
  postType: string;
  boards: string;
  start: string;
  end: string;
  windowSize: string;
  page: number;
  fetchNumber: number;
}
