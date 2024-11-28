import { Module } from '@nestjs/common';
import { LessionsCourseService } from './lessions_course.service';
import { LessionsCourseController } from './lessions_course.controller';

@Module({
  controllers: [LessionsCourseController],
  providers: [LessionsCourseService],
})
export class LessionsCourseModule {}
