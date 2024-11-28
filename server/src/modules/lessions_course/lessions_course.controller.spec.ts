import { Test, TestingModule } from '@nestjs/testing';
import { LessionsCourseController } from './lessions_course.controller';
import { LessionsCourseService } from './lessions_course.service';

describe('LessionsCourseController', () => {
  let controller: LessionsCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessionsCourseController],
      providers: [LessionsCourseService],
    }).compile();

    controller = module.get<LessionsCourseController>(LessionsCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
