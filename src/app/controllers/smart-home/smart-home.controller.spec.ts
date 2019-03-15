import { Test, TestingModule } from '@nestjs/testing';
import { SmartHomeController } from './smart-home.controller';

describe('SmartHome Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SmartHomeController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SmartHomeController = module.get<SmartHomeController>(SmartHomeController);
    expect(controller).toBeDefined();
  });
});
