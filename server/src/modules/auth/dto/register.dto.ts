import {IsNotEmpty, IsString, Length} from 'class-validator'

export class RegisterDTO {
    @IsString()
    @Length(8, 16, { message: 'username must be 8 to 16 characters' })
    @IsNotEmpty({ message: 'username is not empty' })
    username: string;

    @IsString()
    @Length(8, 16, { message: 'password must be 8 to 16 characters' })
    @IsNotEmpty({ message: 'password is not empty!' })
    password: string;

    @IsString()
    @Length(8, 16, { message: 're_password must be 8 to 16 characters' })
    @IsNotEmpty({ message: 're_password is not empty!' })
    re_password: string;
}