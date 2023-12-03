import { StoreModel } from '../service/model/store.model';
import { GetStoreReq } from '../controller/payload/get-store.req';
import { GetStoreRes } from '../controller/payload/get-store.res';
import { GetStoreListModel } from '../service/model/get-store-list.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorePresenterMapper {
    toModel(req: GetStoreReq): GetStoreListModel {
        const getStoreListModel = new GetStoreListModel();
        getStoreListModel.page = req.page;
        getStoreListModel.size = req.size;
        getStoreListModel.sort = req.sort;
        getStoreListModel.minOrderPrice = req.minOrderPrice;
        getStoreListModel.maxDeliveryPrice = req.maxDeliveryPrice;
        return getStoreListModel;
    }

    toRes(model: StoreModel): GetStoreRes {
        const getStoreRes = new GetStoreRes();
        getStoreRes.id = model.id;
        getStoreRes.category = model.category;
        getStoreRes.category = model.category;
        getStoreRes.deliveryPrice = model.deliveryPrice;
        getStoreRes.name = model.name;
        getStoreRes.images = model.images;
        getStoreRes.minimumOrderPrice = model.minimumOrderPrice;
        getStoreRes.reviewCount = model.reviewCount;
        getStoreRes.rating = model.rating;
        getStoreRes.createdAt = model.createdAt;
        getStoreRes.updatedAt = model.updatedAt;
        return getStoreRes;
    }
}
