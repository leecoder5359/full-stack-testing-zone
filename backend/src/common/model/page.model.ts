import { PageSort } from '../types/page-sort.type';

export class PageModel {
    page?: number = 1;
    size?: number = 20;
    sort?: PageSort = 'DESC';
}
