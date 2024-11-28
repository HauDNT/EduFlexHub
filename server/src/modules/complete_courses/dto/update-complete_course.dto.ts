import { PartialType } from '@nestjs/mapped-types';
import { CreateCompleteCourseDto } from './create-complete_course.dto';

export class UpdateCompleteCourseDto extends PartialType(CreateCompleteCourseDto) {}
