import {IsEmail, IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class OtpVerifyDTO {
    @IsNotEmpty({ message: 'email is not empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'verifyCode is not empty' })
    @IsString()
    @Length(6, 6, { message: 'Verify code must be 6 characters'})
    verifyCode: string;
}