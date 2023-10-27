import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getFrequency(): Observable<FrequencyService[]> {
    return this.http.get<FrequencyService[]>(`${this.apiUrl}/api/frequencies`);
  }
}
