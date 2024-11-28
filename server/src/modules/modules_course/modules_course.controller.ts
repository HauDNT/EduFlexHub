import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesCourseService } from './modules_course.service';
import { CreateModulesCourseDto } from './dto/create-modules_course.dto';
import { UpdateModulesCourseDto } from './dto/update-modules_course.dto';

@Controller('modules-course')
export class ModulesCourseController {
  constructor(private readonly modulesCourseService: ModulesCourseService) {}

  @Post()
  create(@Body() createModulesCourseDto: CreateModulesCourseDto) {
    return this.modulesCourseService.create(createModulesCourseDto);
  }

  @Get()
  findAll() {
    return this.modulesCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModulesCourseDto: UpdateModulesCourseDto) {
    return this.modulesCourseService.update(+id, updateModulesCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesCourseService.remove(+id);
  }
}
