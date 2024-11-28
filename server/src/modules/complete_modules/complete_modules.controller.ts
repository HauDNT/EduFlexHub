import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompleteModulesService } from './complete_modules.service';
import { CreateCompleteModuleDto } from './dto/create-complete_module.dto';
import { UpdateCompleteModuleDto } from './dto/update-complete_module.dto';

@Controller('complete-modules')
export class CompleteModulesController {
  constructor(private readonly completeModulesService: CompleteModulesService) {}

  @Post()
  create(@Body() createCompleteModuleDto: CreateCompleteModuleDto) {
    return this.completeModulesService.create(createCompleteModuleDto);
  }

  @Get()
  findAll() {
    return this.completeModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completeModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompleteModuleDto: UpdateCompleteModuleDto) {
    return this.completeModulesService.update(+id, updateCompleteModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completeModulesService.remove(+id);
  }
}
