import { Injectable } from '@nestjs/common';
import { CreateCompleteModuleDto } from './dto/create-complete_module.dto';
import { UpdateCompleteModuleDto } from './dto/update-complete_module.dto';

@Injectable()
export class CompleteModulesService {
  create(createCompleteModuleDto: CreateCompleteModuleDto) {
    return 'This action adds a new completeModule';
  }

  findAll() {
    return `This action returns all completeModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completeModule`;
  }

  update(id: number, updateCompleteModuleDto: UpdateCompleteModuleDto) {
    return `This action updates a #${id} completeModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} completeModule`;
  }
}
