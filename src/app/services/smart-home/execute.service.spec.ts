import { Test, TestingModule } from '@nestjs/testing';
import { ExecuteService } from './exec.service';

describe('ExecuteService', () => {
  let service: ExecuteService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecuteService],
    }).compile();
    service = module.get<ExecuteService>(ExecuteService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
