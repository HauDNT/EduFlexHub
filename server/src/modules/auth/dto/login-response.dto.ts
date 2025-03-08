import { IsNotEmpty, IsNumber, IsString, IsEmail } from "class-validator";

export class UserLoginResponseDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number | null;

    @IsString()
    @IsNotEmpty()
    username?: string | null;

    @IsString()
    @IsNotEmpty()
    email?: string | null;

    @IsString()
    @IsNotEmpty()
    accessToken: string | null;
}