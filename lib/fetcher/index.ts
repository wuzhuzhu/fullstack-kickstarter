import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR from 'swr';

const axiosInstance = axios.create({
    timeout: 30000,
});

const fetcher = (url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data?: any) => {
    const options: AxiosRequestConfig = {
        method,
        url,
        data,
    };

    return axiosInstance(options)
        .then((res: AxiosResponse) => res.data)
        .catch((error) => {
            // Log the error to a logging platform
            console.error(error);

            // Handle network errors
            if (!error.response) {
                throw new Error('Network Error');
            }

            // handle timeout error
            if (error.code === 'ECONNABORTED') {
                throw new Error('Abort: API Response timeout');
            }

            // Handle invalid API responses
            if (error.response.status >= 400 && error.response.status < 500) {
                throw new Error('Invalid API Response');
            }

            // Handle authentication errors
            if (error.response.status === 401) {
                throw new Error('Authentication Error');
            }

            // Handle validation errors
            if (error.response.status === 400) {
                throw new Error('Validation Error');
            }

            // Handle server-side errors
            if (error.response.status >= 500) {
                throw new Error('Server Error');
            }

            throw error;
        });
};

export default fetcher