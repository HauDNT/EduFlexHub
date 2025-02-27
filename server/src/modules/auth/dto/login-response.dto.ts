import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserLoginResponseDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number | null;

    @IsString()
    @IsNotEmpty()
    username: string | null;

    @IsString()
    @IsNotEmpty()
    accessToken: string | null;
}