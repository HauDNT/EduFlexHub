import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterResponseDTO {
    @IsNumber()
    @IsNotEmpty()
    status: number

    @IsString()
    @IsNotEmpty()
    message: string
}