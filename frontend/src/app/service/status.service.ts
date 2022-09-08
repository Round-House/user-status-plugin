import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getStatus(account: String) {
    return this.http.post<any>('/api/plugins?request=get_status', { account });
  }
}
