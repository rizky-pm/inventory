import axios from 'axios';

const BASE_URL = 'http://103.63.25.53:3001';

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

privateApi.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { access_token } = JSON.parse(user);
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  }
);

export { privateApi, publicApi };
