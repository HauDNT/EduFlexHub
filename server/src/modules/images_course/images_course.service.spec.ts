import { Test, TestingModule } from '@nestjs/testing';
import { ImagesCourseService } from './images_course.service';

describe('ImagesCourseService', () => {
  let service: ImagesCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesCourseService],
    }).compile();

    service = module.get<ImagesCourseService>(ImagesCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
