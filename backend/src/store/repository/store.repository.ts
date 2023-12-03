import { Injectable } from '@nestjs/common';
import { FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
        const { page, size, sort, minOrderPrice, maxDeliveryPrice } = model;

        const query: FindManyOptions<Store> = {
            where: {},
            order: {
                id: sort,
            },
            skip: (page - 1) * size,
            take: size,
        };

        if (minOrderPrice) {
            query.where = { ...query.where, minimumOrderPrice: MoreThanOrEqual(minOrderPrice) };
        }

        if (maxDeliveryPrice) {
            query.where = { ...query.where, deliveryPrice: LessThanOrEqual(maxDeliveryPrice) };
        }

        const stores = await this.repository.find(query);

        return stores.map((store) => this.mapper.toModel(store));
    }

    async findById(id: number): Promise<StoreModel> {
        const store = await this.repository.findOneBy({ id });
        return this.mapper.toModel(store);
    }
}