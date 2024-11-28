import { Module } from '@nestjs/common';
import { CompleteCoursesService } from './complete_courses.service';
import { CompleteCoursesController } from './complete_courses.controller';

@Module({
  controllers: [CompleteCoursesController],
  providers: [CompleteCoursesService],
})
export class CompleteCoursesModule {}
