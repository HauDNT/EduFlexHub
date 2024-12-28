import { Module } from '@nestjs/common';
import { SocialAccountsService } from './social_accounts.service';
import { SocialAccountsController } from './social_accounts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SocialAccount} from "@/modules/social_accounts/entities/social_account.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialAccount]),
  ],
  controllers: [SocialAccountsController],
  providers: [SocialAccountsService],
})
export class SocialAccountsModule {}
