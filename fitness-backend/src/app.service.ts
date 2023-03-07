import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {

  }
  getHello(): string {
    return 'Hello World!';
  }
  async testApi(code: string) {
    const res = await this.httpService.axiosRef.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: "wxa3649f39d6ff7f0e",
        secret: "f7fe79dd861b6ea764db4bd125aab36a",
        js_code: code,
        grant_type: "authorization_code",
      }
    })
    return res.data
  }
}
