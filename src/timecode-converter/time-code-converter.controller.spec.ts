import { Test, TestingModule } from '@nestjs/testing';
import { TimeCodeConverterController } from './time-code-converter.controller';
import { TimeCodeConverterService } from './time-code-converter.service';

describe('TimecodeConverterController', () => {
  let controller: TimeCodeConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCodeConverterController],
      providers: [TimeCodeConverterService],
    }).compile();

    controller = module.get<TimeCodeConverterController>(
      TimeCodeConverterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
