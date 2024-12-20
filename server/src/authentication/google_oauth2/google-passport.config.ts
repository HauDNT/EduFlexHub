import passport from "passport";
import { UsersService } from '@/modules/users/users.service';
import { User } from "@/modules/users/entities/user.entity";
import { VerifyCallback } from "passport-google-oauth20";

export class PassportOAuthConfig {
    constructor(
        private readonly userService: UsersService
    ) { }

    configure() {
        passport.serializeUser((user: User, done: VerifyCallback) => {     // serializeUser: Hàm lưu thông tin cần thiết của tài khoản vào Session (Ở đây chỉ lưu trường email để tiết kiệm bộ nhớ)
            done(null, user.email);
        });

        passport.deserializeUser(async (email: string, done: VerifyCallback) => {      // deserializeUser: Hàm này truy cập và trả về đầy đủ thông tin người dùng từ trường được lưu trong session
            try {
                const user = await this.userService.findByEmail(email);
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        })
    }
}

