import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { StorePresenterMapper } from '../mapper/store.presenter.mapper';
import { GetStoreReq } from './payload/get-store.req';
import { CommonRes } from '../../common/payload/common.res';
import { StoreModel } from '../service/model/store.model';
import { IStoreService, STORE_SERVICE } from '../service/interface/store-service.interface';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetStoreRes } from './payload/get-store.res';
import { ApiGetItemsResponse, ApiGetResponse } from '../../common/decorator/swagger.decorator';
import { Public } from '../../common/decorator/public.decorator';
import { PageRes } from '../../common/payload/page.res';

@ApiTags('store')
@ApiExtraModels(CommonRes, PageRes, GetStoreReq, GetStoreRes)
@Controller('store')
export class StoreController {
    constructor(@Inject(STORE_SERVICE) private storeService: IStoreService, private mapper: StorePresenterMapper) {}

    @Get()
    @ApiGetItemsResponse(GetStoreRes)
    async getStores(@Query() getStoreReq: GetStoreReq) {
        const model = this.mapper.toModel(getStoreReq);
        const results = await this.storeService.find(model);
        const response = results.map((result: StoreModel) => this.mapper.toRes(result));
        return CommonRes.of('가게 리스트 조회', response);
    }

    @Get(':id')
    @ApiGetResponse(GetStoreRes)
    @ApiBearerAuth()
    async getStore(@Param() id: number) {
        const model = await this.storeService.findById(id);
        return CommonRes.of('가게 조회', this.mapper.toRes(model));
    }

    @Get('/search')
    search(@Query() query: any) {

    }

    @Get('/category/:category')
    searchCategory(@Param() category: any) {

    }
}
