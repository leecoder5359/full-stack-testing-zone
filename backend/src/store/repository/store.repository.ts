import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Store } from './entity/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetStoreListModel } from '../service/model/get-store-list.model';
import { StoreModel } from '../service/model/store.model';
import { StorePersistenceMapper } from '../mapper/store.persistence.mapper';

export const STORE_REPOSITORY = 'STORE_REPOSITORY' as const;

export interface IStoreRepository {
    find(model: GetStoreListModel): Promise<StoreModel[]>;

    findById(id: number): Promise<StoreModel>;
}

@Injectable()
export class StoreRepository implements IStoreRepository {
    constructor(@InjectRepository(Store) private repository: Repository<Store>, private mapper: StorePersistenceMapper
    ) {
    }

    async find(model: GetStoreListModel): Promise<StoreModel[]> {
        const { page, size } = model;
        const stores = await this.repository.find({
            skip: (page - 1) * size,
            take: size,
        });
        return stores.map((store) => this.mapper.toModel(store));
    }

    async findById(id: number): Promise<StoreModel> {
        const store = await this.repository.findOneBy({ id });
        return this.mapper.toModel(store);
    }
}