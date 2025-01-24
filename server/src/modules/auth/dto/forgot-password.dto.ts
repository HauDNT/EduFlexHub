import {IsNotEmpty, IsEmail, IsString, Length} from 'class-validator'

export class EmailDTO {
    @IsEmail()
    @IsNotEmpty({ message: 'email is not empty'})
    email: string;
}

export class ResetPasswordDTO extends EmailDTO {
    @IsString()
    @Length(8, 16, { message: 'password must be 8 to 16 characters' })
    @IsNotEmpty({ message: 'password is not empty!' })
    password: string;

    @IsString()
    @Length(8, 16, { message: 're_password must be 8 to 16 characters' })
    @IsNotEmpty({ message: 're_password is not empty!' })
    re_password: string;
}
