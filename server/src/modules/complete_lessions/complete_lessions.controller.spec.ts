import { Test, TestingModule } from '@nestjs/testing';
import { CompleteLessionsController } from './complete_lessions.controller';
import { CompleteLessionsService } from './complete_lessions.service';

describe('CompleteLessionsController', () => {
  let controller: CompleteLessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteLessionsController],
      providers: [CompleteLessionsService],
    }).compile();

    controller = module.get<CompleteLessionsController>(CompleteLessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
