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

  it('should return 250 with frames route', () => {
    const result = {
      queries: { framerate: 25, timecode: '00:00:10:00' },
      result: 250,
    };
    expect(
      controller.getFrameCount({ timecode: '00:00:10:00', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 00:04:10:00 with time code route and pass args 250, frame, 25', () => {
    const result = {
      queries: { framerate: 25, time: 250, unit: 'seconds' },
      result: '00:04:10:00',
    };
    expect(
      controller.getTimeCode({ time: 250, unit: 'seconds', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 00:04:10:00 with time code route and pass args 250, frame, 25', () => {
    const result = {
      queries: { framerate: 25, time: '250', unit: 'frames' },
      result: '00:00:10:00',
    };
    expect(
      controller.getTimeCode({ time: 250, unit: 'frames', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 250 with seconds route', () => {
    const result = {
      queries: { timecode: '00:00:10:00', framerate: 25 },
      result: 10,
    };
    expect(
      controller.getSeconds({ timecode: '00:00:10:00', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 6310 with seconds route', () => {
    const result = {
      queries: { timecode: '01:45:10:00', framerate: 25 },
      result: 6310,
    };
    expect(
      controller.getSeconds({ timecode: '01:45:10:00', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 10000 with milliseconds route', () => {
    const result = {
      queries: { timecode: '00:00:10:00', framerate: 25 },
      result: 10000,
    };
    expect(
      controller.getMilliseconds({ timecode: '00:00:10:00', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 6310000 with seconds route', () => {
    const result = {
      queries: { timecode: '01:45:10:00', framerate: 25 },
      result: 6310000,
    };
    expect(
      controller.getMilliseconds({ timecode: '01:45:10:00', framerate: 25 }),
    ).toStrictEqual(result);
  });

  it('should return 00:04:00:00 with addition route', () => {
    const result = {
      queries: {
        time: {
          start: '00:03:00:24',
          end: '00:00:59:01',
        },
        framerate: 25,
      },
      result: '00:04:00:00',
    };
    expect(
      controller.getAddition({
        start: '00:03:00:24',
        end: '00:00:59:01',
        framerate: 25,
      }),
    ).toStrictEqual(result);
  });

  it('should return 00:03:00:24 with subtraction route', () => {
    const result = {
      queries: {
        time: {
          start: '00:04:00:00',
          end: '00:00:59:01',
        },
        framerate: 25,
      },
      result: '00:03:00:24',
    };

    expect(
      controller.getSubtraction({
        start: '00:04:00:00',
        end: '00:00:59:01',
        framerate: 25,
      }),
    ).toStrictEqual(result);
  });
});
