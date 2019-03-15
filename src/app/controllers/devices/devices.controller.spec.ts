import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';

describe('Devices Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DevicesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DevicesController = module.get<DevicesController>(DevicesController);
    expect(controller).toBeDefined();
  });
});
