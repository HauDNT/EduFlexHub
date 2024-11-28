import { Test, TestingModule } from '@nestjs/testing';
import { CompleteLessionsService } from './complete_lessions.service';

describe('CompleteLessionsService', () => {
  let service: CompleteLessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompleteLessionsService],
    }).compile();

    service = module.get<CompleteLessionsService>(CompleteLessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
