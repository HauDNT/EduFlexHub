import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserLoginResponseDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    accessToken: string;
}