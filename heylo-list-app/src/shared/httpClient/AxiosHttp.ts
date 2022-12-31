import AxiosHttpClient from "./AxiosHttpClient";

const { BASE_URL } = process.env;

export class AxiosHttp extends AxiosHttpClient {

    private static classInstance?: AxiosHttp;

    public constructor() {
        super(BASE_URL ?? 'http://localhost:3000');
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new AxiosHttp();
        }

        return this.classInstance;
    }

    public updateAuthHeader(accessToken: string) {
        this.instance.interceptors.request.use((config) => {
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
        });
    }

    public get client() {
        return this.instance;
    }

}
