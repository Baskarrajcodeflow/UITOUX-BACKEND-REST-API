import { Test, TestingModule } from '@nestjs/testing';
import { PlaceProductOrderController } from './place-product-order.controller';

describe('PlaceProductOrderController', () => {
  let controller: PlaceProductOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceProductOrderController],
    }).compile();

    controller = module.get<PlaceProductOrderController>(PlaceProductOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
