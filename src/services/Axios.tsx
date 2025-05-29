import axios from 'axios';

// Create an Axios instance with the YTS API base URL
const ytsApi = axios.create({
  baseURL: 'https://yts.mx/api/v2/',
  timeout: 10000, // Set a timeout of 10 seconds
});

// Request Interceptor
ytsApi.interceptors.request.use(
  (config) => {
    // Modify the request config before sending it
    console.log(`Sending ${config.method?.toUpperCase()} request to ${config.url}`);

    // You can add custom headers or query params here if needed
    // Example: config.headers['Authorization'] = 'Bearer your_token';
    // Example: config.params = { ...config.params, api_key: 'your_api_key' };

    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues before the request is sent)
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
ytsApi.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log(`Response received from ${response.config.url} with status ${response.status}`);

    // Optionally modify the response data
    // Example: return response.data.data; // If YTS API wraps data in a 'data' field
    return response;
  },
  (error) => {
    // Handle response errors (e.g., 4xx, 5xx status codes)
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(`Error ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // No response was received
      console.error('No response received:', error.request);
    } else {
      // Something else caused the error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);





export default ytsApi;