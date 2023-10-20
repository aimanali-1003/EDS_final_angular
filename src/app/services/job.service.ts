import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService { 
  private apiUrl = 'https://localhost:44327';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Jobs`);
  }

  getJob(jobId: string): Observable<string> { 
    return this.http.get<any>(`${this.apiUrl}/api/Jobs/${jobId}`);
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
