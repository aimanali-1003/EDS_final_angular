import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://lr7rg.wiremockapi.cloud';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job`);
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/job`, jobData);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/job/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/job/${jobId}`);
  }
}
