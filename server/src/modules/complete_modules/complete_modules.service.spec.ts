import { Test, TestingModule } from '@nestjs/testing';
import { CompleteModulesService } from './complete_modules.service';

describe('CompleteModulesService', () => {
  let service: CompleteModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompleteModulesService],
    }).compile();

    service = module.get<CompleteModulesService>(CompleteModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
