import { GetStoreListModel } from '../model/get-store-list.model';
import { StoreModel } from '../model/store.model';

export const STORE_SERVICE = 'STORE_SERVICE' as const;

export interface IStoreService {
    find(model: GetStoreListModel): Promise<StoreModel[]>;
    findById(id: number): Promise<StoreModel>;
}