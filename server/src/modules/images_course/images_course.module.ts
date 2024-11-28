import { Module } from '@nestjs/common';
import { ImagesCourseService } from './images_course.service';
import { ImagesCourseController } from './images_course.controller';

@Module({
  controllers: [ImagesCourseController],
  providers: [ImagesCourseService],
})
export class ImagesCourseModule {}
