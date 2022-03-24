import { Test, TestingModule } from '@nestjs/testing';
import { TimeCodeConverterService } from './time-code-converter.service';

describe('TimecodeConverterService', () => {
  let service: TimeCodeConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeCodeConverterService],
    }).compile();

    service = module.get<TimeCodeConverterService>(TimeCodeConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
