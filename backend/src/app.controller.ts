import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { StatusEntity } from './models/status.entity';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_status')
  getStatus(@Body() userId: number): Observable<StatusEntity> {
    return this.appService.getStatus(userId);
  }

  @MessagePattern('set_status')
  setStatus(
    @Body() userId: number,
    @Body() status: string,
  ): Observable<StatusEntity> {
    return this.appService.setStatus(userId, status);
  }
}
