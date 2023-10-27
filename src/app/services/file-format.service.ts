import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/config';
@Injectable({
  providedIn: 'root'
})
export class FileFormatService {

  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getfileFormats(): Observable<FileFormatService[]> {
    return this.http.get<FileFormatService[]>(`${this.apiUrl}/api/jobs/fileformat`);
  }
}
