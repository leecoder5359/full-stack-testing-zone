import { ApiProperty } from '@nestjs/swagger';

export class PageRes<T> {
    @ApiProperty({ required: true })
    page: number;

    @ApiProperty({ required: true })
    size: number;

    @ApiProperty({ required: true })
    sort: 'DESC' | 'ASC';

    @ApiProperty({ required: true })
    items: T[];
}
