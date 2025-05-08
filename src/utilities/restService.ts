import config from 'config';
import { isEmpty, set } from 'lodash';

interface RestServiceInput {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  token?: string | null;
  params?: Record<string, unknown>;
  gov?: boolean | null;
  apiPoint?: boolean;
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
  apiPoint = false,
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
  let path = '';
  if (gov) {
    path = `${config.apiGovUrl}${endpoint}`;
  } else if (apiPoint) {
    path = `${config.apiPointUrl}${endpoint}`;
  } else {
    path = `${config.apiUrl}${endpoint}`;
  }

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  if (token) {
    set(headers, 'Authorization', `Bearer ${token}`);
  }

  const reqBody: RequestInit = {
    method,
    headers,
  };

  if (params && !isEmpty(params)) {
    if (method === 'POST') {
      reqBody.body = JSON.stringify(params);
    } else if (method === 'GET') {
      const queryParams = createQueryParams(params);
      path = `${path}?${queryParams}`;
    }
  }

  try {
    const response = await fetch(path, reqBody);
    const json = await response.json();

    if (json) {
      if (gov) return { data: { data: json } };
      return { status: response.status, data: json };
    }
    return { status: response.status, data: undefined };
  } catch (error) {
    return {
      status: false,
      data: undefined,
      result: 'error',
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
