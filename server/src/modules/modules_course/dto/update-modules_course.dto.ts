import { PartialType } from '@nestjs/mapped-types';
import { CreateModulesCourseDto } from './create-modules_course.dto';

export class UpdateModulesCourseDto extends PartialType(CreateModulesCourseDto) {}
