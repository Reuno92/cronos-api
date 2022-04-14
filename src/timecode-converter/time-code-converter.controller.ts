import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TimeCodeConverterService } from './time-code-converter.service';

@Controller('api/v1/calculate/')
export class TimeCodeConverterController {
  constructor(
    private readonly timeCodeConverterService: TimeCodeConverterService,
  ) {}

  @Get('frames')
  public getFrameCount(
    @Query() queries: { timecode: string; framerate: number },
  ) {
    try {
      const { timecode, framerate } = queries;
      const RESULT = this.timeCodeConverterService?.calculateFrameCount(
        timecode,
        Number(framerate),
      );
      return {
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('timecode')
  public getTimeCode(
    @Query() queries: { time: number; unit: string; framerate: number },
  ) {
    try {
      const { time, unit, framerate } = queries;
      let value: number;
      switch (unit) {
        // Default unit is seconds
        case 'seconds':
          value = Number(time);
          break;
        case 'milliseconds':
          value = Number(time) / 1000;
          break;
        case 'minutes':
          value = Number(time) * 60;
          break;
        case 'hours':
          value = Number(time) * 3600;
          break;
        case 'frames':
          value = Number(time) / framerate;
          break;
        default:
          throw new HttpException(
            { error: 'Unit is not recognized.' },
            HttpStatus.CONFLICT,
          );
      }

      const RESULT = this.timeCodeConverterService?.calculateTimeCode(
        value,
        Number(framerate),
      );

      return {
        result: RESULT,
        queries: {
          time: time,
          unit: unit,
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('seconds')
  public getSeconds(@Query() queries: { timecode: string; framerate: number }) {
    try {
      const { timecode, framerate } = queries;
      const RESULT = this.timeCodeConverterService?.calculateSeconds(
        timecode,
        Number(framerate),
      );
      return {
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('milliseconds')
  public getMilliseconds(
    @Query() queries: { timecode: string; framerate: number },
  ) {
    try {
      const { timecode, framerate } = queries;
      const RESULT = this.timeCodeConverterService?.calculateMilliseconds(
        timecode,
        Number(framerate),
      );
      return {
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('addition')
  public getAddition(
    @Query() queries: { start: string; end: string; framerate: number },
  ) {
    try {
      const { start, end, framerate } = queries;
      const RESULT = this.timeCodeConverterService?.calculateAddition(
        {
          start: start.toString(),
          end: end.toString(),
        },
        Number(framerate),
      );
      return {
        result: RESULT,
        queries: {
          time: {
            start: start,
            end: end,
          },
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('subtraction')
  public getSubtraction(
    @Query() queries: { start: string; end: string; framerate: number },
  ) {
    try {
      const { start, end, framerate } = queries;
      const RESULT = this.timeCodeConverterService?.calculateSubtraction(
        {
          start: start,
          end: end,
        },
        Number(framerate),
      );
      return {
        result: RESULT,
        queries: {
          time: {
            start: start,
            end: end,
          },
          framerate: framerate,
        },
      };
    } catch (e: any) {
      throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
