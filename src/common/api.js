import axios from 'axios';
import { tokenKey } from 'consts';

class Api {
  constructor() {
    /* Create new axios instance and use it everywhere in app */
    this.api = axios.create({
      baseURL: 'https://localhost:8001/api/',
      timeout: 10000,
    });

    this.authToken = localStorage.getItem(tokenKey) || null;

    /* If Token is present in localStorage save it to run authorized api calls */
    this.setToken(this.authToken);
  }

  /**
   * @param {String} method Method to call api
   * @param  {...any} params Params that passed to method
   */
  call = (method, ...params) => {
    return this.api[method](...params);
  };

  /**
   * Extract data from @AxiosResponse and return it
   * @param {AxiosResponse} res Response that returned from axios
   */
  getData = (res) => res.data;

  /**
   * Logout api
   */
  logOut() {
    return this.setToken(null);
  }

  setToken(token) {
    if (token) {
      this.authToken = token;
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(tokenKey, token);
    } else {
      this.authToken = undefined;
      this.api.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem(tokenKey);
    }
    return this;
  }
}

export default new Api();
