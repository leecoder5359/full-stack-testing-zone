import { ApiProperty } from '@nestjs/swagger';

export class FindUserReqDto {
    @ApiProperty({ required: true })
    id: number;
}
