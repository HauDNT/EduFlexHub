import { PartialType } from '@nestjs/mapped-types';
import { CreateImagesCourseDto } from './create-images_course.dto';

export class UpdateImagesCourseDto extends PartialType(CreateImagesCourseDto) {}
