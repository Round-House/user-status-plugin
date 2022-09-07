import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { StatusEntity } from './models/status.entity';

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly statusRepository: Repository<StatusEntity>,
  ) {}

  getStatus(account: string): Observable<StatusEntity | any> {
    return from(
      this.statusRepository.findOneOrFail({
        where: { account },
      }),
    ).pipe(
      map((status: StatusEntity) => {
        return status;
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  setStatus(account: string, status: string): Observable<any> {
    const newStatus = new StatusEntity();
    newStatus.account = account;
    newStatus.status = status;

    return from(
      this.statusRepository.findOneOrFail({ where: { account } }),
    ).pipe(
      map((status: StatusEntity) => {
        newStatus.id = status.id;
        return from(this.statusRepository.save(newStatus));
      }),
      catchError(() => {
        return from(this.statusRepository.save(newStatus));
      }),
    );
  }
}
