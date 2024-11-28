import { Module } from '@nestjs/common';
import { CompleteModulesService } from './complete_modules.service';
import { CompleteModulesController } from './complete_modules.controller';

@Module({
  controllers: [CompleteModulesController],
  providers: [CompleteModulesService],
})
export class CompleteModulesModule {}
