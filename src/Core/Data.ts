import { useState, useEffect } from 'react';
import { nodes } from 'samples/library';

class DataManager {
  async getAdapters() {
    return nodes;
  }
}

export const Data = new DataManager();

export const useGetData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setData(await Data.getAdapters());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    getData();
  }, []);

  return [loading, data, error];
};
