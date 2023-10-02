import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private apiUrl = 'https://lr7rg.wiremockapi.cloud';
  private jobLogs: any[] = [];

  constructor(private http: HttpClient) { }

  getJobLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/joblog`);
  }

  getCompletedJobLogs() { 
    return this.jobLogs;
  }
 
  getOngoingJobLogs() { 
    return this.jobLogs;
  }
}
