import config from 'config';
import { isEmpty, set } from 'lodash';

interface RestServiceInput {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  token?: string | null;
  params?: Record<string, unknown>;
  gov?: boolean | null;
}

const createQueryParams = (params: Record<string, unknown>) => {
  const paramArray = Object.entries(params).map(([key, value]) => {
    if (value !== undefined && value !== null) {
      return `${key}=${value}`;
    }
    return '';
  });
  return paramArray.filter(p => p).join('&');
};

export async function restService<D>({
  endpoint,
  method,
  params,
  token = null,
  gov = false,
}: RestServiceInput): Promise<
  | {
      status: number;
      data: { data: D; status: boolean } | undefined;
    }
  | {
      data: { data: D };
    }
  | {
      data: undefined;
      result: 'error';
      message: string;
      status: boolean;
    }
> {
  const headers = {};
  let path = gov ? `${config.apiGovUrl}${endpoint}` : `${config.apiUrl}${endpoint}`;

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  if (token) {
    set(headers, 'Authorization', `Bearer ${token}`);
  }

  const reqBody = {
    method,
    headers,
    body: {},
  };

  if (params && !isEmpty(params) && method === 'POST') {
    reqBody.body = JSON.stringify(params);
  } else if (params && !isEmpty(params) && method === 'GET') {
    const queryParams = createQueryParams(params);
    path = `${path}?${queryParams}`;
  }
  return fetch(path)
    .then(response =>
      response.json().then(json => {
        if (json) {
          if (gov) return { data: { data: json } };
          return { status: response.status, data: json };
        }
        return { status: response.status, data: undefined };
      }),
    )
    .catch(error => ({
      status: false,
      data: undefined,
      result: 'error',
      message: error,
    }));
}
