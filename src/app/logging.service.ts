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
    // Implement logic to fetch completed job logs
    // You can store them in this.jobLogs or fetch from an API
    return this.jobLogs;
  }

  // Method to retrieve ongoing job logs
  getOngoingJobLogs() {
    // Implement logic to fetch ongoing job logs
    // You can store them in this.jobLogs or fetch from an API
    return this.jobLogs;
  }
}
