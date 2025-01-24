import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {User} from "@/modules/users/entities/user.entity";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmailWithOTPResetPassword(user: User, otpCode: string) {
        await this.mailerService.sendMail({
            from: '"EduFlexHub Support Team"',
            to: user.email,
            subject: 'Your Verification Code for EduFlexHub Reset Password',
            template: 'reset-password',
            context: {
                name: user.fullname ?? user.email,
                otpCode: otpCode,
            }
        })
    }
}
