import { Test, TestingModule } from '@nestjs/testing';
import { SmartHomeService } from './smart-home.service';

describe('SmartHomeService', () => {
  let service: SmartHomeService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartHomeService],
    }).compile();
    service = module.get<SmartHomeService>(SmartHomeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
