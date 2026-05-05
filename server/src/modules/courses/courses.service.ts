import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '@/modules/courses/entities/course.entity';
import { IsNull, Repository } from 'typeorm';
import { GetDataWithQueryParamsDTO } from '@/dto';
import { TableMetaData } from '@/interfaces/table';
import { getDataWithQueryAndPaginate } from '@/utils/paginateAndSearch';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) 
    private courseRepository: Repository<Course>,
  ) {}

  async getCoursesByTypeAndQuery(data: GetDataWithQueryParamsDTO): Promise<TableMetaData<Course>> {
    const { page, limit, queryString, searchFields } = data;

    return await getDataWithQueryAndPaginate<Course>({
      repository: this.courseRepository,
      page,
      limit,
      queryString,
      searchFields: searchFields ? searchFields.split(',') : [],
      selectFields: [
        'id',
        'name',
        'duration',
        'description',
        'price',
        'created_at',
        'updated_at',
      ],
      columnsMeta: [
        { key: 'id', displayName: 'ID', type: 'number' },
        { key: 'name', displayName: 'Tên khoá học', type: 'string' },
        { key: 'duration', displayName: 'Thời lượng (phút)', type: 'number' },
        { key: 'description', displayName: 'Mô tả', type: 'string' },
        { key: 'price', displayName: 'Giá', type: 'money' },
        { key: 'created_at', displayName: 'Ngày tạo', type: 'date' },
        { key: 'updated_at', displayName: 'Ngày cập nhật', type: 'date' },
      ],
      where: { deleted_at: IsNull() }
    })
  }
}
