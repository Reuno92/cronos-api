import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TimeCodeConverterService } from './time-code-converter.service';

@Controller('api/v1/calculate/')
export class TimeCodeConverterController {
  constructor(
    private readonly timeCodeConverterService: TimeCodeConverterService,
  ) {}

  @Get('frames')
  public getFrameCount(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { timecode, framerate } = req.query;
      const RESULT = this.timeCodeConverterService?.calculateFrameCount(
        timecode.toString(),
        Number(framerate),
      );
      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }

  @Get('timecode')
  public getTimeCode(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { time, unit, framerate } = req.query;
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
          return res
            .status(HttpStatus.CONFLICT)
            .json({ error: 'Unit is not recognized.' });
      }

      const RESULT = this.timeCodeConverterService?.calculateTimeCode(
        value,
        Number(framerate),
      );

      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          time: time,
          unit: unit,
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }

  @Get('seconds')
  public getSeconds(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { timecode, framerate } = req.query;
      const RESULT = this.timeCodeConverterService?.calculateSeconds(
        timecode.toString(),
        Number(framerate),
      );
      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }

  @Get('milliseconds')
  public getMilliseconds(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { timecode, framerate } = req.query;
      const RESULT = this.timeCodeConverterService?.calculateMilliseconds(
        timecode.toString(),
        Number(framerate),
      );
      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          timecode: timecode,
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }

  @Get('addition')
  public getAddition(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { start, end, framerate } = req.query;
      const RESULT = this.timeCodeConverterService?.calculateAddition(
        {
          start: start.toString(),
          end: end.toString(),
        },
        Number(framerate),
      );
      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          time: {
            start: start,
            end: end,
          },
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }

  @Get('subtraction')
  public getSubtraction(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    try {
      const { start, end, framerate } = req.query;
      const RESULT = this.timeCodeConverterService?.calculateSubtraction(
        {
          start: start.toString(),
          end: end.toString(),
        },
        Number(framerate),
      );
      return res.status(HttpStatus.OK).json({
        result: RESULT,
        queries: {
          time: {
            start: start,
            end: end,
          },
          framerate: framerate,
        },
      });
    } catch (e: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e?.message });
    }
  }
}
