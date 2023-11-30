import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export type Sort = 'DESC' | 'ASC';
export class PageReq {
    @ApiPropertyOptional({ description: '페이지. default = 20' })
    @Transform((params) => Number(params.value))
    @IsInt()
    page?: number = 1;

    @ApiPropertyOptional({ description: '페이지당 데이터 갯수. default = 20' })
    @Transform((params) => Number(params.value))
    @IsInt()
    size?: number = 20;

    @ApiPropertyOptional({ description: '정렬 방법. default = DESC' })
    sort?: Sort = 'DESC';
}
