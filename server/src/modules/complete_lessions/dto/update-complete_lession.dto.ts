import { PartialType } from '@nestjs/mapped-types';
import { CreateCompleteLessionDto } from './create-complete_lession.dto';

export class UpdateCompleteLessionDto extends PartialType(CreateCompleteLessionDto) {}
