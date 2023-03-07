import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test-wx-api')
  async test(@Query('js_code') code: string) {
    console.log('code', code)
    return await this.appService.testApi(code)

  }
}
