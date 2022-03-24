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

  describe('Calculate time code feature', () => {
    it('should return 00:00:01:00 with 1 second and 25 frames rate', () =>
      expect(service?.calculateTimeCode(1, 25)).toEqual('00:00:01:00'));

    it('should return 00:01:30:00 with 75 seconds and 25 frames rate', () =>
      expect(service?.calculateTimeCode(75, 25)).toEqual('00:01:15:00'));

    it('should return 00:04:15:00 with 255 seconds and 25 frames rate', () =>
      expect(service?.calculateTimeCode(255, 25)).toEqual('00:04:15:00'));

    it('should return 01:15:00:00 with 4500 seconds and 25 frames rate', () =>
      expect(service?.calculateTimeCode(4500, 25)).toEqual('01:15:00:00'));

    it('should return 02:00:00:00 with 7200 seconds and 25 frames rate', () =>
      expect(service?.calculateTimeCode(7200, 25)).toEqual('02:00:00:00'));

    it('should return 04:10:00:00 with 15000 seconds and 25 frames rate', () =>
      expect(service?.calculateTimeCode(15000, 25)).toEqual('04:10:00:00'));
  });

  describe('Addition between two time code', () => {
    it('should return 24 frames with 10 frames, 14 frames and 25 frames rate', () =>
      expect(
        service?.calculateAddition(
          { start: '00:00:00:10', end: '00:00:00:14' },
          25,
        ),
      ).toEqual('00:00:00:24'));

    it('should return 1 second with 10 frames, 15 frames and 25 frames rate', () =>
      expect(
        service?.calculateAddition(
          { start: '00:00:00:10', end: '00:00:00:15' },
          25,
        ),
      ).toEqual('00:00:01:00'));

    it('should return 4 seconds with 1 second 10 frames, 2 seconds 15 frames and 25 frames rate', () =>
      expect(
        service?.calculateAddition(
          { start: '00:00:01:10', end: '00:00:02:15' },
          25,
        ),
      ).toEqual('00:00:04:00'));

    it('should return 3 minutes 30 seconds with 1 minute, 2 minutes 30 seconds and 25 frames rate', () =>
      expect(
        service?.calculateAddition(
          { start: '00:01:00:00', end: '00:02:30:00' },
          25,
        ),
      ).toEqual('00:03:30:00'));

    it('should return 1 heure 3 minutes 4 seconds with 30 minutes 36 seconds 22 frames, 32 minutes 27 seconds 3 frames and 25 frames rate', () =>
      expect(
        service?.calculateAddition(
          { start: '00:30:36:22', end: '00:32:27:03' },
          25,
        ),
      ).toEqual('01:03:04:00'));
  });

  describe('Subtraction between two time code', () => {
    it('should return 1 second with 5 seconds, 4 seconds and 25 frames rate', () =>
      expect(
        service?.calculateSubtraction(
          { start: '00:00:05:00', end: '00:00:04:00' },
          25,
        ),
      ).toEqual('00:00:01:00'));

    it('should return 28 minutes with 1 hour, 32 minutes and 25 frames rate', () =>
      expect(
        service?.calculateSubtraction(
          { start: '01:00:00:00', end: '00:32:00:00' },
          25,
        ),
      ).toEqual('00:28:00:00'));

    it('should return 28 minutes with 1 hour, 32 minutes and 25 frames rate', () =>
      expect(
        service?.calculateSubtraction(
          { start: '02:58:59:10', end: '01:32:15:12' },
          25,
        ),
      ).toEqual('01:26:43:23'));

    it('should return 28 minutes with 1 hour, 32 minutes and 25 frames rate', () =>
      expect(
        service?.calculateSubtraction(
          { start: '03:00:00:00', end: '00:08:45:03' },
          25,
        ),
      ).toEqual('02:51:14:22'));
  });
});
