import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';


abstract class AxiosHttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: AxiosError) => {
        console.log(error.code, 'ERROR')
        return Promise.reject(error)
    };
}

export default AxiosHttpClient;
