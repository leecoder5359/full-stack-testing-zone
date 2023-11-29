import { Store } from '../repository/entity/store.entity';
import { StoreModel } from '../service/model/store.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorePersistenceMapper {
    toModel(store: Store): StoreModel {
        const model = new StoreModel();
        model.name = store.name;
        model.images = store.images;
        model.rating = store.rating;
        model.category = store.category;
        model.deliveryPrice = store.deliveryPrice;
        model.minimumOrderPrice = store.minimumOrderPrice;
        model.reviewCount = store.reviewCount;
        return model;
    }
}