import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('clientID'),
            clientSecret: configService.get<string>('clientSecret'),
            callbackURL: configService.get<string>('callbackURL'),
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log('Google Profile:', profile); // Kiểm tra profile từ Google
        const { name, emails, photos } = profile;

        const user = {
            email: emails[0]?.value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos[0]?.value,
            accessToken,
        };

        done(null, user); // Trả dữ liệu user về Passport
    }
}