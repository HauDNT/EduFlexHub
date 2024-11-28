import { Test, TestingModule } from '@nestjs/testing';
import { ImagesCourseController } from './images_course.controller';
import { ImagesCourseService } from './images_course.service';

describe('ImagesCourseController', () => {
  let controller: ImagesCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesCourseController],
      providers: [ImagesCourseService],
    }).compile();

    controller = module.get<ImagesCourseController>(ImagesCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
