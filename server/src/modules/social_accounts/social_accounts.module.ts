import { Module } from '@nestjs/common';
import { SocialAccountsService } from './social_accounts.service';
import { SocialAccountsController } from './social_accounts.controller';

@Module({
  controllers: [SocialAccountsController],
  providers: [SocialAccountsService],
})
export class SocialAccountsModule {}
