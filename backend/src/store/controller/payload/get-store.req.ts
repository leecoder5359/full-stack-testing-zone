import { PageReq } from '../../../common/payload/page.req';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetStoreReq extends PageReq {
    @ApiPropertyOptional({ description: '배달비 최대 금액', example: 5000 })
    maxDeliveryPrice?: number;

    @ApiPropertyOptional({ description: '최소 주문 금액', example: 10000 })
    minOrderPrice?: number;
}
