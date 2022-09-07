import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { StatusEntity } from './models/status.entity';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_status')
  getStatus(@Body('userId') account: string): Observable<String> {
    return this.appService.getStatus(account);
  }

  @MessagePattern('set_status')
  setStatus(
    @Body('account') account: string,
    @Body('status') status: string,
  ): Observable<StatusEntity> {
    return this.appService.setStatus(account, status);
  }
}
