import { ApiProperty } from '@nestjs/swagger';

export class RefreshRes {
    @ApiProperty({ required: true })
    accessToken: string;

    @ApiProperty({ required: true })
    refreshToken: string;
}