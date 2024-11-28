import { PartialType } from '@nestjs/mapped-types';
import { CreateCompleteModuleDto } from './create-complete_module.dto';

export class UpdateCompleteModuleDto extends PartialType(CreateCompleteModuleDto) {}
