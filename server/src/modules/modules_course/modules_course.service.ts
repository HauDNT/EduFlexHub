import { Injectable } from '@nestjs/common';
import { CreateModulesCourseDto } from './dto/create-modules_course.dto';
import { UpdateModulesCourseDto } from './dto/update-modules_course.dto';

@Injectable()
export class ModulesCourseService {
  create(createModulesCourseDto: CreateModulesCourseDto) {
    return 'This action adds a new modulesCourse';
  }

  findAll() {
    return `This action returns all modulesCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modulesCourse`;
  }

  update(id: number, updateModulesCourseDto: UpdateModulesCourseDto) {
    return `This action updates a #${id} modulesCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} modulesCourse`;
  }
}
