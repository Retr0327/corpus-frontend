import urlJoin from 'url-join';

const isProduction = process.env.NODE_ENV === 'production';

// ----- version tag -----
const V1 = 'v1';

// ------ api urls ------
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

if (!API_URL || !EXTERNAL_API_URL) {
  throw new Error('api urls undefined');
}

const api = isProduction ? `/service/api/${V1}` : API_URL;
const externalAPI = isProduction ? `http://nginx:80/service/api/${V1}` : EXTERNAL_API_URL;

// ---- corpus service ----
const corpus = urlJoin(api, 'corpus');
const externalCorpus = urlJoin(externalAPI, 'corpus');

const API = {
  V1: {
    corpus: {
      boards: urlJoin(externalCorpus, 'boards'),
      concordance: urlJoin(corpus, 'concordance'),
    },
  },
};

export default API;
