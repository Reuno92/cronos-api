import { Injectable } from '@nestjs/common';
import * as Timecode from 'smpte-timecode';
import { FRAMERATE } from 'smpte-timecode';

@Injectable()
export class TimeCodeConverterService {
  /**
   * Calculate the number of frames from one time codes
   * @param { string } value - Time code such as 23:59:59:24.
   * @param { number } framerate - Framerate. @see smpte-time code.FRAMERATE
   * @return number
   */
  public calculateFrameCount(value: string, framerate: number): number {
    return TimeCodeConverterService.getFrameCount(
      value,
      framerate as Timecode.FRAMERATE,
    );
  }

  /**
   * Calculate time code to seconds
   * @param { string } value - Time code such as 23:59:59:24.
   * @param { number } framerate - Framerate. @see smpte-time code.FRAMERATE
   * @return number
   */
  public calculateSeconds(value: string, framerate: number): number {
    TimeCodeConverterService.isFramerate(framerate);
    return TimeCodeConverterService?.getSeconds(value, framerate);
  }

  /**
   * Calculate time code to miliseconds
   * @param { string } value - Time code such as 23:59:59:24.
   * @param { number } framerate - Framerate. @see smpte-time code.FRAMERATE
   * @return number
   */
  public calculateMilliseconds(value: string, framerate: number): number {
    TimeCodeConverterService.isFramerate(framerate);
    return TimeCodeConverterService.getMilliseconds(value, framerate);
  }

  /**
   * Addition between two time codes
   * @param time
   * @param { number } framerate - Framerate. @see smpte-time code.FRAMERATE
   * @return string
   */
  public calculateAddition(
    time: { start: string; end: string },
    framerate: number,
  ): string {
    TimeCodeConverterService.isFramerate(framerate);
    return TimeCodeConverterService.addition(time, framerate);
  }

  /**
   * Subtraction between two time codes
   * @param { start: string, end: string } time -
   * @param { number } framerate - Framerate. @see smpte-time code.FRAMERATE
   * @return string
   */
  public calculateSubtraction(
    time: { start: string; end: string },
    framerate: number,
  ): string {
    TimeCodeConverterService.isFramerate(framerate);
    return TimeCodeConverterService.subtraction(time, framerate);
  }

  /**
   * Calculate time code in seconds
   * @param { number } value - value in seconds.
   * @param { number } frameRate - Framerate. @see smpte-time code.FRAMERATE.
   * @return string
   */
  public calculateTimeCode(value: number, frameRate: number): string {
    return TimeCodeConverterService.getInTimeCode(value, frameRate);
  }

  /**
   * Determines if value is a real framerates
   * @param { number } value - number to verify
   * @private
   */
  private static isFramerate(value: number): value is Timecode.FRAMERATE {
    const OPERATION =
      value === 23.976 ||
      value === 24 ||
      value === 25 ||
      value === 29.97 ||
      value === 30 ||
      value === 50 ||
      value === 59.94 ||
      value === 60;

    if (!OPERATION) {
      throw new Error('Value is not framerate');
    }

    return OPERATION;
  }

  /**
   * Determines if the value is conforms to time code format.
   * @param { string } value - Timecode such as 23:59:59:24
   * @param { 'start'|'end'|'value' } times - Determine name if it returns an errors.
   * @private
   */
  private static valueIsTimeCode(
    value: string,
    times: 'start' | 'end' | 'value',
  ): boolean {
    const OPERATION = new RegExp(
      '(^[0-1][0-9]|^20|^21|^22|^23):([0-5][0-9]):([0-5][0-9]):([0-5][0-9]$)',
      'gm',
    ).test(value);

    if (!OPERATION) {
      throw new Error(
        `${
          times.charAt(0).toUpperCase() + times?.slice(1).toLowerCase()
        } time is not time code.`,
      );
    }

    return OPERATION;
  }

  /**
   * return time code from seconds
   * @param { number } value - In seconds
   * @param { number } frameRate - Frame rate such as smpte-time code.FRAMERATE
   * @private
   */
  private static getInTimeCode(value: number, frameRate: number): string {
    const FRAMES = Math.floor((value % 1) * frameRate);
    const HOURS = Math.floor(value / 3600);
    const MINUTES = Math.floor((value / 60) % 60);
    const SECONDS = Math.floor(value % 60);

    const DURATION_FRAMES: string = ('0' + FRAMES).slice(-2);
    const DURATION_HOURS: string = ('0' + HOURS).slice(-2);
    const DURATION_MINUTES: string = ('0' + MINUTES).slice(-2);
    const DURATION_SECONDS: string = ('0' + SECONDS).slice(-2);

    return `${DURATION_HOURS}:${DURATION_MINUTES}:${DURATION_SECONDS}:${DURATION_FRAMES}`;
  }

  /**
   * return frame count from time code
   * @param { string } value - time code such as 23:59:59:24
   * @param { number } framerate - framerate such as smpte-time code.FRAMERATE
   * @private
   */
  private static getFrameCount(
    value: string,
    framerate: Timecode.FRAMERATE,
  ): number {
    TimeCodeConverterService?.valueIsTimeCode(value, 'value');
    return new Timecode(value, framerate).frameCount;
  }

  /**
   * return seconds from time code
   * @param { string } value - time code such as 23:59:59:24
   * @param { number } framerate - framerate such as smpte-time code.FRAMERATE
   * @private
   */
  private static getSeconds(value: string, framerate: number): number {
    TimeCodeConverterService?.valueIsTimeCode(value, 'value');
    return (
      TimeCodeConverterService.getFrameCount(
        value,
        framerate as Timecode.FRAMERATE,
      ) / framerate
    );
  }

  /**
   * return milliseconds from time code
   * @param { string } value - time code such as 23:59:59:24
   * @param { number } framerate - framerate such as smpte-time code.FRAMERATE
   * @private
   */
  private static getMilliseconds(value: string, framerate: number): number {
    TimeCodeConverterService?.valueIsTimeCode(value, 'value');
    return TimeCodeConverterService.getSeconds(value, framerate) * 1000;
  }

  /**
   * Addition start timecde and end time code
   * @param { start: number, end: number } time - input time code and output time code
   * @param { number } framerate - framerate such as smpte-time code.FRAMERATE
   * @private
   */
  private static addition(
    time: { start: string; end: string },
    framerate: number,
  ): string {
    const { start, end } = time;

    TimeCodeConverterService.valueIsTimeCode(start, 'start');
    TimeCodeConverterService.valueIsTimeCode(end, 'end');

    this.isFramerate(framerate);

    return new Timecode(time.start, framerate as FRAMERATE)
      .add(time.end)
      ?.toString();
  }

  /**
   * Substract start time code and end time code
   * @param { start: number, end: number } time - input time code and output time code
   * @param { number } framerate - framerate such as smpte-time code.FRAMERATE
   * @private
   */
  private static subtraction(
    time: { start: string; end: string },
    framerate: number,
  ): string {
    const { start, end } = time;

    TimeCodeConverterService.valueIsTimeCode(start, 'start');
    TimeCodeConverterService.valueIsTimeCode(end, 'end');

    const START = new Timecode(start, framerate as FRAMERATE);
    const END = new Timecode(end, framerate as FRAMERATE);

    if (START > END) {
      return new Timecode(time.start, framerate as FRAMERATE)
        .subtract(time.end)
        ?.toString();
    } else {
      throw new Error('Start time is lower than end time.');
    }
  }
}
