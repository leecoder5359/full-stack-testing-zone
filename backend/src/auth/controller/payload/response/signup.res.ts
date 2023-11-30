import { ApiProperty } from '@nestjs/swagger';

export class SignupRes {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    accessToken: string;

    @ApiProperty({ required: true })
    refreshToken: string;
}
