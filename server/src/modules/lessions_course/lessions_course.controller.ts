import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessionsCourseService } from './lessions_course.service';
import { CreateLessionsCourseDto } from './dto/create-lessions_course.dto';
import { UpdateLessionsCourseDto } from './dto/update-lessions_course.dto';

@Controller('lessions-course')
export class LessionsCourseController {
  constructor(private readonly lessionsCourseService: LessionsCourseService) {}

  @Post()
  create(@Body() createLessionsCourseDto: CreateLessionsCourseDto) {
    return this.lessionsCourseService.create(createLessionsCourseDto);
  }

  @Get()
  findAll() {
    return this.lessionsCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessionsCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessionsCourseDto: UpdateLessionsCourseDto) {
    return this.lessionsCourseService.update(+id, updateLessionsCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessionsCourseService.remove(+id);
  }
}
