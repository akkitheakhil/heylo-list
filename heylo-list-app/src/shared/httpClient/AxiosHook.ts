import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useEffect } from 'react';
import { AuthenticatedUserContext } from 'src/context/AuthContext';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};

export const useAxios = () => {
    const axiosInstance = axios.create(axiosRequestConfiguration);
    const { accessToken } = useContext(
        AuthenticatedUserContext
    );


    useEffect(() => {

        axiosInstance.interceptors.request.use((config) => {
            if (accessToken) {
                return {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            }
            return config;
        }, error => {
            Promise.reject(error)
        })

    }, [accessToken]);
    return { axiosInstance };
}
