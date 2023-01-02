import { Request } from 'types';

async function request<T>({ url, method, payload }: Request<T>) {
  const _payload = payload ?? {};
  const body = method !== 'GET' ? JSON.stringify(_payload) : null;
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  // Request Timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5 * 1000);

  const response = await fetch(url, {
    credentials: 'include',
    method,
    body,
    headers,
    signal: controller.signal,
  });

  clearTimeout(id);

  return response.json();
}

export default request;
