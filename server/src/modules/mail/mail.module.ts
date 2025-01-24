import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import { join } from 'path';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: 'tienhau.it@gmail.com',
                    pass: 'anbx ulio wbta zpar',
                },
            },
            defaults: {
                from: '"No Reply" <EduFlexHub>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {
}
