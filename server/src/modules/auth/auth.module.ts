import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from '@/authentication/jwt/jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from '@/authentication/google_oauth2/google-strategy';
import { PassportModule } from '@nestjs/passport';
import { SocialAccountsModule } from "../social_accounts/social_accounts.module";
import { SocialAccount } from "@/modules/social_accounts/entities/social_account.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, SocialAccount]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secret_key'),
                signOptions: {
                    expiresIn: '1d',
                }
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        SocialAccountsModule,
        PassportModule.register({ 
            defaultStrategy: 'google',
            session: true,
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JWTStrategy,
        GoogleStrategy,
    ],
})
export class AuthModule { }
