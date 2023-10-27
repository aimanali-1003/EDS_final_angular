import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class DataRecipientService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getDataRecipeintTypes(): Observable<DataRecipientService[]> {
    return this.http.get<DataRecipientService[]>(`${this.apiUrl}/api/datarecipients/datarecipienttypes`);
  }
}
