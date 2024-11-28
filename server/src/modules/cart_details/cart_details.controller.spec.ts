import { Test, TestingModule } from '@nestjs/testing';
import { CartDetailsController } from './cart_details.controller';
import { CartDetailsService } from './cart_details.service';

describe('CartDetailsController', () => {
  let controller: CartDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartDetailsController],
      providers: [CartDetailsService],
    }).compile();

    controller = module.get<CartDetailsController>(CartDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
