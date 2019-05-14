import axios, { AxiosRequestConfig } from 'axios';
import { Auth } from 'Core/Auth';
export const APIClient = axios.create({
  baseURL: `${window.location.origin}/api/`,
  timeout: 5000,
});

APIClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await Auth.getToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    return config;
  }
);
