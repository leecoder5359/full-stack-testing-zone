import { Inject, Injectable } from '@nestjs/common';
import { IStoreRepository, STORE_REPOSITORY } from '../repository/store.repository';
import { StoreModel } from './model/store.model';
import { GetStoreListModel } from './model/get-store-list.model';
import { IStoreService } from './interface/store-service.interface';

@Injectable()
export class StoreService implements IStoreService {
    constructor(
        @Inject(STORE_REPOSITORY) private storeRepository: IStoreRepository,
    ) {
    }

    async find(model: GetStoreListModel): Promise<StoreModel[]> {
        return this.storeRepository.find(model);
    }

    async findById(id: number): Promise<StoreModel> {
        return this.storeRepository.findById(id);
    }
}
