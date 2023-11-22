import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';
import { ResponseViewModel } from '../model/ResponseViewModel';// Import your interfaces here
import { JobVM } from '../model/JobModel';

@Injectable({
  providedIn: 'root'
})
export class JobService { 
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getJob(jobId: string): Observable<string> { 
    return this.http.get<any>(`${this.apiUrl}/api/Jobs/${jobId}`);
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Jobs`, jobData);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/Jobs/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/jobs/${jobId}`);
  }

  getJobs(vm: any): Observable<ResponseViewModel<JobVM[]>> {
    const params = new HttpParams({ fromObject: vm });
    return this.http.get<ResponseViewModel<JobVM[]>>(`${this.apiUrl}/GetJobs`, { params });
  }

 
}
