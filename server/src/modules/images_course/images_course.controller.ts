import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesCourseService } from './images_course.service';
import { CreateImagesCourseDto } from './dto/create-images_course.dto';
import { UpdateImagesCourseDto } from './dto/update-images_course.dto';

@Controller('images-course')
export class ImagesCourseController {
  constructor(private readonly imagesCourseService: ImagesCourseService) {}

  @Post()
  create(@Body() createImagesCourseDto: CreateImagesCourseDto) {
    return this.imagesCourseService.create(createImagesCourseDto);
  }

  @Get()
  findAll() {
    return this.imagesCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagesCourseDto: UpdateImagesCourseDto) {
    return this.imagesCourseService.update(+id, updateImagesCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesCourseService.remove(+id);
  }
}
