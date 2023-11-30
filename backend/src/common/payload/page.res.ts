import { ApiProperty } from '@nestjs/swagger';
import { Sort } from './page.req';

export class PageRes<T> {
    @ApiProperty({ required: true })
    page: number;

    @ApiProperty({ required: true })
    size: number;

    @ApiProperty({ required: true })
    sort: Sort;

    @ApiProperty({ required: true })
    items: T[];
}
