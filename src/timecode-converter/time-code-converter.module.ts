import { Module } from '@nestjs/common';
import { TimeCodeConverterService } from './time-code-converter.service';
import { TimeCodeConverterController } from './time-code-converter.controller';

@Module({
  controllers: [TimeCodeConverterController],
  providers: [TimeCodeConverterService],
})
export class TimeCodeConverterModule {}
