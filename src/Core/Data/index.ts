import get from 'lodash-es/get';
import { useEffect, useState } from 'react';
import { adapter } from 'samples/adapter';
import { nodes } from 'samples/library';
import { APIClient } from './axios';

type GraphQLValues = {
  [key: string]: any;
};

type GraphQLError = {
  message: string;
};

type Result<T> = {
  data: T;
  errors: GraphQLError[];
};

class DataManager {
  async query<T>(query: string, variables?: GraphQLValues): Promise<Result<T>> {
    let { data } = await APIClient.post('/graphql', {
      query,
      variables,
    });

    return { data: data.data as T, errors: data.errors as GraphQLError[] };
  }

  async get(query: string): Promise<any> {
    switch (query) {
      case 'adapter':
        return adapter;
      case 'adapters':
        return nodes;
      default:
        return undefined;
    }
  }

  async getAdapters(): Promise<Array<any>> {
    return new Promise((res) => setTimeout(() => res(nodes), 500));
  }
}

export const Data = new DataManager();

export const useGetData = <T>(query: string): [boolean, T | undefined, string | undefined] => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function getData() {
      try {
        if (!cancelled) {
          const { data, errors } = await Data.query<T>(query);
          setData(data);
          if (errors && errors.length) {
            setError(errors[0].message);
          }
          setLoading(false);
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return [loading, data, error];
};

export const getData = async (query: string, variables?: any) => {
  let error;
  let data;
  try {
    const { data: result, errors } = await Data.query(query, variables);
    data = result;
    if (errors && errors.length) {
      error = errors[0].message;
    }
  } catch (err) {
    const message = get(err, 'response.data.errors[0].message', err.message);
    error = message;
  }

  return { data, error };
};
