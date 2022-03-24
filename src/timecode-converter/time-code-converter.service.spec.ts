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

  describe('Calculate milliseconds feature', () => {
    it('should return 1000 millseconds with 1 second and 25 frames rate', () =>
      expect(service.calculateMilliseconds('00:00:01:00', 25)).toEqual(1000));

    it('should return 60000 milliseconds with 1 minute and 25 frames rate', () =>
      expect(service?.calculateMilliseconds('00:01:00:00', 25)).toEqual(60000));

    it('should return 150000 milliseconds with 2 minutes 30 seconds and 25 frames rate', () =>
      expect(service?.calculateMilliseconds('00:02:30:00', 25)).toEqual(
        150000,
      ));

    it('should return 3600000 milliseconds with 1 hour and 25 frames rate', () =>
      expect(service?.calculateMilliseconds('01:00:00:00', 25)).toEqual(
        3600000,
      ));
  });
});
