import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength } from 'class-validator';

export class SignupReq {
    @ApiProperty({ required: true, example: 'leecoder' })
    @MaxLength(30)
    name: string;

    @ApiProperty({ required: true, example: 'test@test.com' })
    @IsEmail()
    @MaxLength(30)
    email: string;

    @ApiProperty({
        required: true,
        example: 'Password1!',
        description: '10~30자리 소문자, 대문자, 특수문자(!@#$%^&*) 포함',
    })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
    password: string;

    @ApiProperty({
        required: true,
        example: 'Password1!',
        description: '10~30자리 소문자, 대문자, 특수문자(!@#$%^&*) 포함',
    })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
    passwordConfirm: string;
}