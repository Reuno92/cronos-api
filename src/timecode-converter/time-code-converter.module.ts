import { Module } from '@nestjs/common';
import { TimeCodeConverterService } from './time-code-converter.service';
import { TimeCodeConverterController } from './time-code-converter.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
      ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
    }),
  ],
  controllers: [TimeCodeConverterController],
  providers: [TimeCodeConverterService],
})
export class TimeCodeConverterModule {}
