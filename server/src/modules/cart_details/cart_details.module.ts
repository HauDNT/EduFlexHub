import { Module } from '@nestjs/common';
import { CartDetailsService } from './cart_details.service';
import { CartDetailsController } from './cart_details.controller';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService],
})
export class CartDetailsModule {}
