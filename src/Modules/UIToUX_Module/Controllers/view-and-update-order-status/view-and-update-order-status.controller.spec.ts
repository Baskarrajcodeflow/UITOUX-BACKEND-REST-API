import { Test, TestingModule } from '@nestjs/testing';
import { ViewAndUpdateOrderStatusController } from './view-and-update-order-status.controller';

describe('ViewAndUpdateOrderStatusController', () => {
  let controller: ViewAndUpdateOrderStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewAndUpdateOrderStatusController],
    }).compile();

    controller = module.get<ViewAndUpdateOrderStatusController>(ViewAndUpdateOrderStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
