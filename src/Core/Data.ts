import { useState, useEffect } from 'react';
import { nodes } from 'samples/library';

class DataManager {
  async getAdapters(): Promise<Array<any>> {
    return new Promise((res) => setTimeout(() => res(nodes), 500));
  }
}

export const Data = new DataManager();

export const useGetData = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [error, setError] = useState<undefined | Error>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    async function getData() {
      try {
        if (!didCancel) {
          setData((await Data.getAdapters()) as []);
        }

        if (!didCancel) {
          setLoading(false);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err);
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      didCancel = true;
    };
  }, []);

  return [loading, data, error];
};
