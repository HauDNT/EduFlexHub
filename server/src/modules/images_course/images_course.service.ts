import { Injectable } from '@nestjs/common';
import { CreateImagesCourseDto } from './dto/create-images_course.dto';
import { UpdateImagesCourseDto } from './dto/update-images_course.dto';

@Injectable()
export class ImagesCourseService {
  create(createImagesCourseDto: CreateImagesCourseDto) {
    return 'This action adds a new imagesCourse';
  }

  findAll() {
    return `This action returns all imagesCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagesCourse`;
  }

  update(id: number, updateImagesCourseDto: UpdateImagesCourseDto) {
    return `This action updates a #${id} imagesCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagesCourse`;
  }
}
