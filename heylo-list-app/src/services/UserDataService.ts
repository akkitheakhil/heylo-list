import { AxiosInstance } from "axios";
import { IUser } from '../shared/models/IUser';
import { API_URL } from "./APIUrlConstants";

export interface UserAuthProps {
    body: IUser,
    axios: AxiosInstance
}

export const userAuth = async ({ body, axios }: UserAuthProps) => {
    const url = API_URL.UserAuth;
    const { data } = await axios.post(url, body);
    return { data };
}
