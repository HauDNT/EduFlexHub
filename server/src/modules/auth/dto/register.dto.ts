import {IsNotEmpty, IsString, Length} from 'class-validator'

export class RegisterDTO {
    @IsString()
    @Length(8, 50, { message: 'username must be 8 to 50 characters' })
    @IsNotEmpty({ message: 'username is not empty' })
    username: string;

    @IsString()
    @Length(8, 50, { message: 'password must be 8 to 50 characters' })
    @IsNotEmpty({ message: 'password is not empty!' })
    password: string;

    @IsString()
    @Length(8, 50, { message: 're_password must be 8 to 50 characters' })
    @IsNotEmpty({ message: 're_password is not empty!' })
    re_password: string;

    @IsString()
    @Length(1, 1, { message: 'account_type is not valid' })
    @IsNotEmpty({ message: 'account_type is not valid' })
    account_type: string;
}