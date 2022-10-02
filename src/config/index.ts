const API = process.env.NEXT_PUBLIC_API;
const { EXTERNAL_API } = process.env;

if (!API) {
  throw new Error('API URL not found');
}

export { API, EXTERNAL_API };
