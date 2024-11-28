import { Test, TestingModule } from '@nestjs/testing';
import { CompleteCoursesController } from './complete_courses.controller';
import { CompleteCoursesService } from './complete_courses.service';

describe('CompleteCoursesController', () => {
  let controller: CompleteCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteCoursesController],
      providers: [CompleteCoursesService],
    }).compile();

    controller = module.get<CompleteCoursesController>(CompleteCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
