import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import AuthService from './auth.service';
import { UserLoginDTO } from './dto/user-login-account.dto';
import { UserLoginResponseDTO } from './dto/user-login-response.dto';
import { GoogleGuard } from '@/authentication/google_oauth2/google-guard';
import { RegisterDTO } from '@/modules/auth/dto/register.dto';
import {
  EmailDTO,
  ResetPasswordDTO,
} from '@/modules/auth/dto/forgot-password.dto';
import { UsersService } from '@/modules/users/users.service';
import { generateOTP } from '@/utils/generateOTP';
import { MailService } from '@/modules/mail/mail.service';
import { OtpVerifyDTO } from '@/modules/auth/dto/otp-verify.dto';
import { RegisterResponseDTO } from '@/modules/auth/dto/register-response';
import { IpAddress } from '@/decorators/IpAddress';
import { LogoutDTO } from '@/modules/auth/dto/logout.dto';
import { AdminLoginDTO } from '@/modules/auth/dto/admin-login-account.dto';
import { AdminLoginResponseDTO } from '@/modules/auth/dto/admin-login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  // Admin login
  @Post('admin/login')
  async adminLogin(
    @IpAddress() ipAddress,
    @Req() request: Request,
    @Body() account: AdminLoginDTO,
  ): Promise<AdminLoginResponseDTO> {
    const userAgent = request.headers['user-agent'];
    return this.authService.adminLogin(account, userAgent, ipAddress);
  }

  // Login in local - user
  @Post('login')
  async login(
    @IpAddress() ipAddress,
    @Req() request: Request,
    @Body() account: UserLoginDTO,
  ): Promise<UserLoginResponseDTO> {
    const userAgent = request.headers['user-agent'];
    return this.authService.userLogin(account, userAgent, ipAddress);
  }

  // Register account in local
  @Post('register')
  async register(@Body() data: RegisterDTO): Promise<RegisterResponseDTO> {
    return this.authService.registerAccount(data);
  }

  // Forgot password
  @Post('verify-email')
  async verifyEmailAndGenerateOTP(@Body() data: EmailDTO): Promise<boolean> {
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
  async OTPAuthentication(@Body() data: OtpVerifyDTO): Promise<boolean> {
    const { email, verifyCode } = data;
    try {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const now = new Date();

        if (user.expires_at < now) {
          console.log('OTP code has expired');
          throw new UnauthorizedException('Mã OTP đã hết hạn');
        }

        if (verifyCode !== user.code_expires) {
          throw new UnauthorizedException('Mã OTP không trùng khớp');
        }

        return true;
      }
    } catch (e) {
      console.log('Error when authenticate with OTP', e.message);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException(
        'Xảy ra lỗi từ phía server trong quá trình xác thực OTP',
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDTO): Promise<boolean> {
    try {
      const result = await this.userService.changePassword(data);
      return !!result;
    } catch (e) {
      console.log('Error when reset password', e.message);
    }
  }

  // Google OAuth
  @Get('google/')
  // @UseGuards(GoogleGuard)          // ==> sử dụng SAI - Đặt @UseGuards(GoogleGuard) ở đây làm kích hoạt cơ chế Google OAuth2 ngay từ đầu
  // làm mất đi query params 'option' truyền vào
  async googleLogin(
    @Req() req,
    @Res() res,
    @IpAddress() ipAddress,
    @Query('option') option: string,
  ) {
    const userAgent = (req.headers['user-agent'] || 'unknown').substring(
      0,
      200,
    );
    const state = encodeURIComponent(
      JSON.stringify({ option, userAgent, ipAddress }),
    );

    res.redirect(
      `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.CLIENT_ID}` +
        `&redirect_uri=${process.env.CALLBACK_URL}` +
        `&response_type=code&scope=email profile` +
        `&state=${state}`,
    );
  }

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req, @Res() res, @Query('state') state: string) {
    const { option, userAgent, ipAddress } = JSON.parse(
      decodeURIComponent(state),
    );

    if (req.user) {
      const user = JSON.stringify(req.user);
      const result = await this.authService.accessWithGoogle(
        user,
        option,
        userAgent,
        ipAddress,
      );

      if (result.userId !== null) {
        if (option === 'login') {
          res.cookie(
            'eduflexhub-authentication',
            JSON.stringify({
              userId: result.userId,
              email: result.email,
              accessToken: result.accessToken,
              role: result.role,
            }),
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 3600000,
            },
          );

          return res.redirect('http://localhost:3000/home');
        } else if (option === 'register') {
          return res.redirect('http://localhost:3000/login');
        }
      } else {
        if (option === 'login') {
          return res.redirect('http://localhost:3000/login?google-unauth=true');
        } else if (option === 'register') {
          return res.redirect(
            'http://localhost:3000/register?google-unauth=true',
          );
        }
      }
    } else {
      return res.redirect(`http://localhost:3000/login`);
    }
  }

  // Logout - Đăng xuất
  @Post('logout')
  async logout(
    @Req() req,
    @Res() res,
    @Body() body: LogoutDTO,
    @IpAddress() ipAddress,
  ): Promise<{ message: string }> {
    const userAgent = req.headers['user-agent'];
    const userIdentifier = body.userIdentifier;

    // Xoá session của người dùng trên thiết bị này
    // Cập nhật isOnline -> 0
    const logoutResult = await this.authService.logout(
      userIdentifier,
      userAgent,
      ipAddress,
    );

    // Xoá cookie trên trình duyệt
    if (logoutResult) {
      res.clearCookie('eduflexhub-authentication');
      return res.status(200).json({ message: 'Đăng xuất thành công' });
    } else {
      return res
        .status(400)
        .json({ message: 'Không tìm thấy phiên để đăng xuất' });
    }
  }
}
