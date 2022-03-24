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

  describe('Calculate frame count feature', () => {
    it('should return frame count 25 with 1 second and 25 frames rate', () => {
      expect(service?.calculateFrameCount('00:00:01:00', 25)).toEqual(25);
    });

    it('should return frame count 50 with 2 seconds and 25 frames rate', () => {
      expect(service?.calculateFrameCount('00:00:02:00', 25)).toEqual(50);
    });

    it('should return frame count 1500 with 1 minute and 25 frames rate', () => {
      expect(service?.calculateFrameCount('00:01:00:00', 25)).toEqual(1500);
    });

    it('should return frame count 1500 with 1 hour and 25 frames rate', () => {
      expect(service?.calculateFrameCount('01:00:00:00', 25)).toEqual(90000);
    });
  });

  describe('Calculate seconds feature', () => {
    it('should return 60 seconds with 1 minute and 25 frames rate', () => {
      expect(service?.calculateSeconds('00:01:00:00', 25)).toEqual(60);
    });

    it('should return 3630 seconds with 1 hour 30 seconds and 25 frames rate', () => {
      expect(service?.calculateSeconds('01:00:30:00', 25)).toEqual(3630);
    });

    it('should return 7200 seconds with 2 hours and 25 frames rate', () => {
      expect(service?.calculateSeconds('02:00:00:00', 25)).toEqual(7200);
    });
  });
});
