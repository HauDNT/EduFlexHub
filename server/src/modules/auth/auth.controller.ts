import {
    Body,
    Controller,
    Get, HttpException,
    InternalServerErrorException,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
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

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly mailService: MailService,
    ) {
    }

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
    ): Promise<RegisterResponseDTO> {
        return this.authService.userRegister(data);
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

    // Google
    @Get('google/')
    @UseGuards(GoogleGuard)
    googleLogin() {
    }

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
