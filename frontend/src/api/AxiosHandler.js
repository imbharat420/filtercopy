import axios from 'axios';

const AxiosHandler = () => {
  // Create a custom Axios instance with a base URL and common headers
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Add a request interceptor to add a loading indicator
  instance.interceptors.request.use(
    (config) => {
      // Show loading indicator
      return config;
    },
    (error) => {
      // Hide loading indicator and return the error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle errors and hide the loading indicator
  instance.interceptors.response.use(
    (response) => {
      // Hide loading indicator and return the response
      return response;
    },
    (error) => {
      // Hide loading indicator and return the error
      return Promise.reject(error);
    }
  );

  return instance;
};

export default AxiosHandler;
