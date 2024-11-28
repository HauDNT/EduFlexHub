import { PartialType } from '@nestjs/mapped-types';
import { CreateLessionsCourseDto } from './create-lessions_course.dto';

export class UpdateLessionsCourseDto extends PartialType(CreateLessionsCourseDto) {}
