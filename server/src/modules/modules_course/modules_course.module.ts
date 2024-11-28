import { Module } from '@nestjs/common';
import { ModulesCourseService } from './modules_course.service';
import { ModulesCourseController } from './modules_course.controller';

@Module({
  controllers: [ModulesCourseController],
  providers: [ModulesCourseService],
})
export class ModulesCourseModule {}
