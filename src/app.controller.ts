import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

   @Get('debug')
  debug() {
    return {
      message: 'Passenger fonctionne',
      jwt: !!process.env.JWT_SECRET,
      database: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
    };
  }
}
