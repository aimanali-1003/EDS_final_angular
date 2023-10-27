import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class JobService { 
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Jobs`);
  }

  getJob(jobId: string): Observable<string> { 
    return this.http.get<any>(`${this.apiUrl}/api/Jobs/${jobId}`);
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Jobs`, jobData);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/job/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/job/${jobId}`);
  }

 
}
