import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class LoggingService { 
 
  private jobLogs: any[] = [];
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getJobLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Joblogs`);
  }

  getCompletedJobLogs() { 
    return this.jobLogs;
  }
 
  getOngoingJobLogs() { 
    return this.jobLogs;
  }
}
