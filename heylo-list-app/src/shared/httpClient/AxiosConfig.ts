import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: process.env.BASE_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};
