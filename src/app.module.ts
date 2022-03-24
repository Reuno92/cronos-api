import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeCodeConverterModule } from './timecode-converter/time-code-converter.module';

@Module({
  imports: [TimeCodeConverterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
