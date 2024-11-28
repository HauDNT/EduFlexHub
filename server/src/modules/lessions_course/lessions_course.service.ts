import { Injectable } from '@nestjs/common';
import { CreateLessionsCourseDto } from './dto/create-lessions_course.dto';
import { UpdateLessionsCourseDto } from './dto/update-lessions_course.dto';

@Injectable()
export class LessionsCourseService {
  create(createLessionsCourseDto: CreateLessionsCourseDto) {
    return 'This action adds a new lessionsCourse';
  }

  findAll() {
    return `This action returns all lessionsCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessionsCourse`;
  }

  update(id: number, updateLessionsCourseDto: UpdateLessionsCourseDto) {
    return `This action updates a #${id} lessionsCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessionsCourse`;
  }
}
