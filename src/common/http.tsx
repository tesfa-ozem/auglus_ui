import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const baseUrl = import.meta.env.VITE_BASE_BASE_API_URL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const originalRequest: AxiosRequestConfig = error.config;
    // Prevent infinite loops
    if (error.response?.status === 401 && originalRequest.url === baseUrl + '/auth/refresh/') {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (
      error.response?.data.code === 'token_not_valid' ||
      error.response?.status === 401 ||
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken && refreshToken !== 'undefined') {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/auth/refresh/', { refresh: refreshToken })
            .then((response:any) => {
              localStorage.setItem('access', response.data.access);

              axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

              return axiosInstance(originalRequest);
            })
            .catch((err:any) => {
              localStorage.clear();
              console.log(err, '');
            });
        } else {
          localStorage.clear();
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        localStorage.clear();
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const access = localStorage.getItem('accessToken');
    if (access) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${access}`,
      };
    }

    return config;
  },
  (error:any) => Promise.reject(error)
);

export default axiosInstance;
