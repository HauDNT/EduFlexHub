import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/login-account.dto';
import { UserLoginResponseDTO } from './dto/login-response.dto';
import { GoogleGuard } from '@/authentication/google_oauth2/google-guard';
import {RegisterDTO} from "@/modules/auth/dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Local local
    @Post('login')
    async login(
        @Body() account: UserLoginDTO
    ): Promise<UserLoginResponseDTO> {
        return this.authService.userLogin(account);
    }

    // Register local
    @Post('register')
    async register(
        @Body() data: RegisterDTO
    ): Promise<any> {
        return this.authService.userRegister(data);
    }

    // Google
    @Get('google/')
    @UseGuards(GoogleGuard)
    googleLogin() { }

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    async googleRedirect(@Req() req, @Res() res) {
        if (req.user) {
            const user = JSON.stringify(req.user);
            const result = await this.authService.accessWithGoogle(user);

            if (result) {
                res.cookie(
                    'eduflexhub-authentication',
                    JSON.stringify({
                        userId: result.userId,
                        username: result.username,
                        accessToken: result.accessToken,
                    }),
                    {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 3600000,
                    }
                );

                return res.redirect('http://localhost:3000/home');
            }
        } else {
            return res.redirect(`http://localhost:3000/?user=error`);
        }
    }
}
