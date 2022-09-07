import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { StatusDto } from '../models/status.dto';
import { StatusService } from '../service/status.service';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent implements OnInit {
  @Input() account: String = '';

  private status: string = 'unknown';

  background: string = '#0000';

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    console.log('test');
    this.statusService
      .getStatus(this.account)
      .pipe(
        map((status: StatusDto) => {
          this.status = status.status!;
          if (this.status === 'active') {
            this.background = 'lime';
          } else if (this.status === 'away') {
            this.background = 'lightgrey';
          } else if (this.status === 'busy') {
            this.background = 'red';
          } else if (this.status === 'do not disturb') {
            this.background = 'firebrick';
          } else if (this.status === 'offline') {
            this.background = 'grey';
          }
        })
      )
      .subscribe();
  }
}
