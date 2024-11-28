import { Injectable } from '@nestjs/common';
import { CreateCompleteCourseDto } from './dto/create-complete_course.dto';
import { UpdateCompleteCourseDto } from './dto/update-complete_course.dto';

@Injectable()
export class CompleteCoursesService {
  create(createCompleteCourseDto: CreateCompleteCourseDto) {
    return 'This action adds a new completeCourse';
  }

  findAll() {
    return `This action returns all completeCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completeCourse`;
  }

  update(id: number, updateCompleteCourseDto: UpdateCompleteCourseDto) {
    return `This action updates a #${id} completeCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} completeCourse`;
  }
}
