import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { TableMetaData } from '@/interfaces/table';
import { Course } from '@/modules/courses/entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCoursesByTypeAndQuery(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('queryString') queryString: string,
    @Query('searchFields') searchFields: string,
  ): Promise<TableMetaData<Course>> {
    return await this.coursesService.getCoursesByTypeAndQuery(
      { page, limit, queryString, searchFields }
    )
  }
}
