import { Test, TestingModule } from '@nestjs/testing';
import { CompleteModulesController } from './complete_modules.controller';
import { CompleteModulesService } from './complete_modules.service';

describe('CompleteModulesController', () => {
  let controller: CompleteModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteModulesController],
      providers: [CompleteModulesService],
    }).compile();

    controller = module.get<CompleteModulesController>(CompleteModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
