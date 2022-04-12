import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TimeCodeConverterService } from './time-code-converter.service';

@Controller('api/v1/calculate/')
export class TimeCodeConverterController {
  constructor(
    private readonly timeCodeConverterService: TimeCodeConverterService,
  ) {}

  @Get('frames')
  public getFrameCount(@Query() timecode: string, @Query() framerate: number) {
    try {
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
    @Query() time: string,
    @Query() unit: string,
    @Query() framerate: number,
  ) {
    try {
      let value: number;
      switch (unit) {
        // By default is seconds
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
  public getSeconds(@Query() timecode: string, @Query() framerate: number) {
    try {
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
    @Query() timecode: string,
    @Query() framerate: number,
  ) {
    try {
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
    @Query() start: string,
    @Query() end: string,
    @Query() framerate: number,
  ) {
    try {
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
    @Query() start: string,
    @Query() end: string,
    @Query() framerate: number,
  ) {
    try {
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
