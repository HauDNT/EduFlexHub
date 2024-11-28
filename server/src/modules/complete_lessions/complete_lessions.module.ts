import { Module } from '@nestjs/common';
import { CompleteLessionsService } from './complete_lessions.service';
import { CompleteLessionsController } from './complete_lessions.controller';

@Module({
  controllers: [CompleteLessionsController],
  providers: [CompleteLessionsService],
})
export class CompleteLessionsModule {}
