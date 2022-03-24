import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStartApi(): string {
    return `<h1>Server is online</h1>`;
  }
}
