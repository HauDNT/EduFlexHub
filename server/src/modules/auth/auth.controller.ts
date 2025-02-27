import {
    Body,
    Controller,
    Get, HttpException,
    InternalServerErrorException,
    Post, Query,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import * as base64url from 'base64-url';
import {AuthService} from './auth.service';
import {UserLoginDTO} from './dto/login-account.dto';
import {UserLoginResponseDTO} from './dto/login-response.dto';
import {GoogleGuard} from '@/authentication/google_oauth2/google-guard';
import {RegisterDTO} from "@/modules/auth/dto/register.dto";
import {EmailDTO, ResetPasswordDTO} from "@/modules/auth/dto/forgot-password.dto";
import {UsersService} from "@/modules/users/users.service";
import {generateOTP} from "@/utils/generateOTP";
import {MailService} from "@/modules/mail/mail.service";
import {OtpVerifyDTO} from "@/modules/auth/dto/otp-verify.dto";
import {RegisterResponseDTO} from "@/modules/auth/dto/register-response";
import {base64UrlDecode, base64UrlEncode} from "@/utils/base64Url_EDCode";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly mailService: MailService,
    ) {
    }

    // Login in local
    @Post('login')
    async login(
        @Body() account: UserLoginDTO
    ): Promise<UserLoginResponseDTO> {
        return this.authService.loginAccount(account);
    }

    // Register account in local
    @Post('register')
    async register(
        @Body() data: RegisterDTO
    ): Promise<RegisterResponseDTO> {
        return this.authService.registerAccount(data);
    }

    // Forgot password
    @Post('verify-email')
    async verifyEmailAndGenerateOTP(
        @Body() data: EmailDTO
    ): Promise<boolean> {
        const user = await this.userService.findByEmail(data.email);

        try {
            if (user) {
                const otp = generateOTP();

                await this.mailService.sendEmailWithOTPResetPassword(user, otp);
                await this.authService.updateOTPVerifyAccount(user, otp);

                return true;
            }
        } catch (e) {
            console.log('Error when send OTP: ', e.message);
        }

        return false;
    }

    // OTP verify
    @Post('otp-authentication')
    async OTPAuthentication(
        @Body() data: OtpVerifyDTO
    ): Promise<boolean> {
        const {email, verifyCode} = data;
        try {
            const user = await this.userService.findByEmail(email);

            if (user) {
                const now = new Date();

                if (user.expires_at < now) {
                    console.log('OTP code has expired')
                    throw new UnauthorizedException('Mã OTP đã hết hạn')
                }

                if (verifyCode !== user.code_expires) {
                    throw new UnauthorizedException('Mã OTP không trùng khớp')
                }

                return true;
            }
        } catch (e) {
            console.log('Error when authenticate with OTP', e.message)

            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Xảy ra lỗi từ phía server trong quá trình xác thực OTP')
        }
    }

    @Post('reset-password')
    async resetPassword(
        @Body() data: ResetPasswordDTO
    ): Promise<boolean> {
        try {
            const result = await this.userService.changePassword(data);
            return !!result
        } catch (e) {
            console.log('Error when reset password', e.message)
        }
    }

    // Google OAuth
    @Get('google/')
    // @UseGuards(GoogleGuard)          // ==> sử dụng SAI - Đặt @UseGuards(GoogleGuard) ở đây làm kích hoạt cơ chế Google OAuth2 ngay từ đầu
                                        // làm mất đi query params 'options' truyền vào
    async googleLogin(@Req() req, @Res() res, @Query('option') option: string) {
        console.log('==> Query params trước khi redirect: ', option);

        const state = option || 'login';

        res.redirect(
            `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.CLIENT_ID}` +
            `&redirect_uri=${process.env.CALLBACK_URL}` +
            `&response_type=code&scope=email profile` +
            `&state=${encodeURIComponent(state)}`
        );
    }

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    async googleRedirect(@Req() req, @Res() res, @Query('state') option: string) {
        console.log('==> Query params sau redirect: ', option);

        if (req.user) {
            const user = JSON.stringify(req.user);
            const result = await this.authService.accessWithGoogle(user, option);

            if (result.userId !== null) {
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
            } else {
                return res.redirect('http://localhost:3000/login?google-unauth=true');
            }
        } else {
            return res.redirect(`http://localhost:3000/login`);
        }
    }
}
