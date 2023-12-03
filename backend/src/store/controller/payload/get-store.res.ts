import { ApiProperty } from '@nestjs/swagger';

export class GetStoreRes {
    @ApiProperty({ required: true, example: 1 })
    id: number;

    @ApiProperty({ required: true, example: '가게 명' })
    name: string;

    @ApiProperty({ required: true, example: ['https://image.com'] })
    images: string[];

    @ApiProperty({ required: true, example: '피자' })
    category: string;

    @ApiProperty({ required: true, example: 1 })
    reviewCount: number;

    @ApiProperty({ required: true, example: 5 })
    rating: number;

    @ApiProperty({ required: true, example: 5000 })
    deliveryPrice: number;

    @ApiProperty({ required: true, example: 10000 })
    minimumOrderPrice: number;

    @ApiProperty({ required: true, example: new Date().toISOString() })
    createdAt: Date;

    @ApiProperty({ required: true, example: new Date().toISOString() })
    updatedAt: Date;
}