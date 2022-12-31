import { Test, TestingModule } from '@nestjs/testing';
import { PrismaApiService } from './prisma-api.service';

describe('PrismaApiService', () => {
  let service: PrismaApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaApiService],
    }).compile();

    service = module.get<PrismaApiService>(PrismaApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
