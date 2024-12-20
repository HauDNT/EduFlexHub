import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/login-account.dto';
import { UserLoginResponseDTO } from './dto/login-response.dto';
import { JWTGuard } from '@/authentication/jwt/jwt-guard';
import { GoogleGuard } from '@/authentication/google_oauth2/google-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Local
    @Post('login')
    async login(
        @Body() account: UserLoginDTO
    ): Promise<UserLoginResponseDTO> {
        return this.authService.userLogin(account);
    }

    // Google
    @Get('google/')
    @UseGuards(GoogleGuard)
    googleLogin() { }

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    googleRedirect(@Req() req, @Res() res) {
        console.log('User data:', req.user);

        if (req.user) {
            const user = JSON.stringify(req.user);
            return res.redirect(`http://localhost:8080/?user=${encodeURIComponent(user)}`);
        } else {
            return res.redirect(`http://localhost:8080/?user=error`);
        }
    }
}
