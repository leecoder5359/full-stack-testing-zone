import { ApiProperty } from '@nestjs/swagger';

export class FindUserResDto {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    email: string;

    @ApiProperty({ required: true })
    createdAt: string;
}
