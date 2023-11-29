import { ApiProperty } from '@nestjs/swagger';

export class PageRes<T> {
    @ApiProperty({ required: true })
    page: number;

    @ApiProperty({ required: true })
    size: number;

    items: T[];
}
