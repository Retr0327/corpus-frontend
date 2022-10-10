const api = process.env.NEXT_PUBLIC_API_SERVICE;
const externalApi = process.env.NEXT_PUBLIC_EXTERNAL_API_SERVICE;

if (!api) {
  throw new Error('API_SERVICE undefined');
}

if (!externalApi) {
  throw new Error('EXTERNAL_API_SERVICE undefined');
}

const corpus = `${api}/corpus`;

const API = { corpus, csv: `${corpus}/csv`, boards: `${externalApi}/corpus/boards` } as const;

export default API;
