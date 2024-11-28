import { Test, TestingModule } from '@nestjs/testing';
import { ModulesCourseController } from './modules_course.controller';
import { ModulesCourseService } from './modules_course.service';

describe('ModulesCourseController', () => {
  let controller: ModulesCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesCourseController],
      providers: [ModulesCourseService],
    }).compile();

    controller = module.get<ModulesCourseController>(ModulesCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
