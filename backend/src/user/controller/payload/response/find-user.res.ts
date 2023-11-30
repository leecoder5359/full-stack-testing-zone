import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserRes {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: true })
    email: string;

    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    role: string;

    @ApiProperty({ required: true })
    createdAt: Date;

    @ApiPropertyOptional({ nullable: true })
    updatedAt: Date;

    @ApiPropertyOptional({ nullable: true })
    deletedAt: Date;
}
