import { ICategoryTask } from './ICategoryTask';
export interface ICategoryList {
    id: string
    name: string;
    category_tasks: ICategoryTask[];
}
