import { IsNotEmpty, IsNumber, IsString, IsEmail } from "class-validator";

export class AdminLoginResponseDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    username?: string | null;

    @IsString()
    @IsNotEmpty()
    email?: string | null;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    accessToken: string;
}