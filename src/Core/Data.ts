import { useEffect, useState } from 'react';
import { adapter } from 'samples/adapter';
import { nodes } from 'samples/library';

class DataManager {
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

export const useGetData = <T>(query: string): [boolean, T | undefined, Error | undefined] => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<undefined | Error>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function getData() {
      try {
        if (!cancelled) {
          setData((await Data.get(query)) as T);
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
