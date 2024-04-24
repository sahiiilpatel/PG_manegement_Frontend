import axios from 'axios';
import { Api_Configuration } from './config';

const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (!storedRefreshToken) {
    // Handle the case where the refresh token is not available (e.g., redirect to login)
    return Promise.reject(new Error('Refresh token not found'));
  }

  try {
    const response = await axios.post(
      `${Api_Configuration.api_url}/api/v1/user/refreshToken`,
      { refreshToken: storedRefreshToken }
    );
    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle refresh token failure (e.g., redirect to login)
    return Promise.reject(error);
  }
};

console.log(localStorage.getItem('accessToken'), 'accessToken');
console.log(localStorage.getItem('refreshToken'), 'refreshToken');

const api = axios.create({
  baseURL: `${Api_Configuration.api_url}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  function (config) {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] =
        `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        const response = await api(originalRequest);
        return response;
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Handle token refresh failure here (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const apiService = async (endpoint, method, data = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method: method,
      data: data
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    // Handle API errors here (e.g., display error messages to the user)
    throw error;
  }
};
