import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompleteLessionsService } from './complete_lessions.service';
import { CreateCompleteLessionDto } from './dto/create-complete_lession.dto';
import { UpdateCompleteLessionDto } from './dto/update-complete_lession.dto';

@Controller('complete-lessions')
export class CompleteLessionsController {
  constructor(private readonly completeLessionsService: CompleteLessionsService) {}

  @Post()
  create(@Body() createCompleteLessionDto: CreateCompleteLessionDto) {
    return this.completeLessionsService.create(createCompleteLessionDto);
  }

  @Get()
  findAll() {
    return this.completeLessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completeLessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompleteLessionDto: UpdateCompleteLessionDto) {
    return this.completeLessionsService.update(+id, updateCompleteLessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completeLessionsService.remove(+id);
  }
}
