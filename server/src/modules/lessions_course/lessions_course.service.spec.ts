import { Test, TestingModule } from '@nestjs/testing';
import { LessionsCourseService } from './lessions_course.service';

describe('LessionsCourseService', () => {
  let service: LessionsCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessionsCourseService],
    }).compile();

    service = module.get<LessionsCourseService>(LessionsCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
