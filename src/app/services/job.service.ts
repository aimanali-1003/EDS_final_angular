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

  getJobs(vm: any): Observable<ResponseViewModel<JobVM[]>> {
    const params = new HttpParams({ fromObject: vm });
    return this.http.get<ResponseViewModel<JobVM[]>>(`${this.apiUrl}/api/Job/GetJobs`, { params });
  }

  getJob(jobId: number): Observable<ResponseViewModel<JobVM>> {
    return this.http.get<ResponseViewModel<JobVM>>(`${this.apiUrl}/api/Job/${jobId}`);
  }

  createJob(newJob: JobVM): Observable<ResponseViewModel<JobVM>> {
    return this.http.post<ResponseViewModel<JobVM>>(`${this.apiUrl}/api/Job`, newJob);
  }

  // updateJob(jobId: string, jobData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/api/Jobs/${jobId}`, jobData);
  // }

  updateJob(jobData: any): Observable<ResponseViewModel<JobVM>> {
    return this.http.post<ResponseViewModel<JobVM>>(`${this.apiUrl}/api/Job`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/jobs/${jobId}`);
  }
 
}
