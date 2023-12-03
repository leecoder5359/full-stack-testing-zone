import { ApiProperty } from '@nestjs/swagger';
import { PageSort } from '../types/page-sort.type';

export class PageRes<T> {
    @ApiProperty({ required: true })
    page: number;

    @ApiProperty({ required: true })
    size: number;

    @ApiProperty({ required: true })
    sort: PageSort;

    @ApiProperty({ required: true })
    items: T[];
}
