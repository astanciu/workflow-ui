import axios from 'axios';
import { Auth } from 'Core/Auth';
import LokkaTransport from 'lokka/transport';

// the default error handler
function handleErrors(errors, data) {
  const message = errors[0].message;
  const error = new Error(`GraphQL Error: ${message}`);
  // error.rawError = errors;
  // error.rawData = data;

  throw error;
}

export class Transport extends LokkaTransport {
  public apiClient;
  public endpoint;
  public handleErrors;

  constructor(endpoint, options: any = {}) {
    if (!endpoint) {
      throw new Error('endpoint is required!');
    }
    super();
    this.apiClient = axios.create({
      // baseURL: '/',
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.request.use(
      (config) =>
        Auth.getToken().then((accessToken) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        }),
      (error) => Promise.reject(error)
    );

    this.endpoint = endpoint;
    this.handleErrors = options.handleErrors || handleErrors;
  }

  send(query, variables, operationName) {
    const payload = { query, variables, operationName };

    return this.apiClient
      .post(this.endpoint, payload)
      .then((r) => {
        const result = r.data.data;
        const errors = r.data.errors;

        if (errors) {
          console.error('Data with Errors', errors);
          const err = new Error(errors[0].message);
          err.name = errors[0].name;
          // err.status = errors[0].statusCode;
          // err.data = result;
          // throw err;
          result.errors = errors;
        }
        return result;
      })
      .catch((e) => {
        if (e.code === 'ECONNABORTED') {
          console.error('Timeout', e);
          e.ignore = true;
          throw e;
        }
        if (e.data) throw e;

        let obj: any = {};
        if (((e.response || {}).data || {}).errors) {
          obj = {
            status: e.response.status,
            name: e.response.data.errors[0].name,
            message: e.response.data.errors[0].message || e.response.statusText,
          };
        } else {
          obj = {
            status: e.response.status,
            name: e.response.data.name,
            message: e.response.data.message || e.response.statusText,
          };
        }

        if (obj.status === 401) Auth.login();
        if (obj.message === "Cannot read property 'iss' of undefined") Auth.login();
        const err = new Error(obj.message);
        // err.status = obj.status;
        err.name = obj.name;
        throw err;
      });
  }
}

export default Transport;
