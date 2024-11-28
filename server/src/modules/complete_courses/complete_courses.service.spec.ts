import { Test, TestingModule } from '@nestjs/testing';
import { CompleteCoursesService } from './complete_courses.service';

describe('CompleteCoursesService', () => {
  let service: CompleteCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompleteCoursesService],
    }).compile();

    service = module.get<CompleteCoursesService>(CompleteCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
