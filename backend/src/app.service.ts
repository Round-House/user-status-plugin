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

  getStatus(userId: number): Observable<StatusEntity | any> {
    return from(
      this.statusRepository.findOneOrFail({
        where: { userId },
      }),
    ).pipe(
      map((status: StatusEntity) => {
        return status.status;
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  setStatus(userId: number, status: string): Observable<any> {
    const newStatus = new StatusEntity();
    newStatus.userId = userId;
    newStatus.status = status;

    return from(
      this.statusRepository.findOneOrFail({ where: { userId } }),
    ).pipe(
      map(() => {
        return from(this.statusRepository.update(userId, newStatus));
      }),
      catchError(() => {
        return from(this.statusRepository.save(newStatus));
      }),
    );
  }
}
