const api = process.env.NEXT_PUBLIC_API_SERVICE;

if (!api) {
  throw new Error('API_SERVICE undefined');
}

const corpus = `${api}/corpus`;

const API = { corpus, csv: `${corpus}/csv`, boards: `${corpus}/boards` } as const;

export default API;
