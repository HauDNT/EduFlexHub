import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from '@/modules/accounts/dto/create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
