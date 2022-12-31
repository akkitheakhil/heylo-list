import { ICategoryList } from './ICategoryList';

export interface IUser {
    email: string;
    userId: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    categories?: ICategoryList[];
}
