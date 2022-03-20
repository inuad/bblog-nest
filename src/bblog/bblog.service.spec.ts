import { Test, TestingModule } from '@nestjs/testing';
import { BblogService } from './bblog.service';

describe('BblogService', () => {
  let service: BblogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BblogService],
    }).compile();

    service = module.get<BblogService>(BblogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
