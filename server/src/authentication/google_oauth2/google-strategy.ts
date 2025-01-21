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
        const { id, displayName, emails, photos, provider } = profile;

        const oAuthData = {
            id: id,
            email: emails[0]?.value,
            fullname: displayName,
            picture: photos[0]?.value,
            provider: provider,
            accessToken,
        };

        done(null, oAuthData); // Trả dữ liệu user về Passport
    }
}