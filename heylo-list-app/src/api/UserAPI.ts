import { IUser } from "@shared/models/IUser";
import { API_URL } from "src/services/APIUrlConstants";
import { AxiosHttp } from "src/shared/httpClient/AxiosHttp";

const axios = AxiosHttp.getInstance();

export const setAuthUser = async (user: IUser) => {
    const url = API_URL.UserAuth;
    console.log(url, 'URL')
    const { data } = await axios.client.post(url, user);
    return { data };
}
