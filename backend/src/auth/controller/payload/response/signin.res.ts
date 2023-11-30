import { ApiProperty } from '@nestjs/swagger';

export class SigninRes {
    @ApiProperty({ required: true })
    accessToken: string;

    @ApiProperty({ required: true })
    refreshToken: string;
}