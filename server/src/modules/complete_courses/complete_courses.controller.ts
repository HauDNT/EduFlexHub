import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompleteCoursesService } from './complete_courses.service';
import { CreateCompleteCourseDto } from './dto/create-complete_course.dto';
import { UpdateCompleteCourseDto } from './dto/update-complete_course.dto';

@Controller('complete-courses')
export class CompleteCoursesController {
  constructor(private readonly completeCoursesService: CompleteCoursesService) {}

  @Post()
  create(@Body() createCompleteCourseDto: CreateCompleteCourseDto) {
    return this.completeCoursesService.create(createCompleteCourseDto);
  }

  @Get()
  findAll() {
    return this.completeCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completeCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompleteCourseDto: UpdateCompleteCourseDto) {
    return this.completeCoursesService.update(+id, updateCompleteCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completeCoursesService.remove(+id);
  }
}
