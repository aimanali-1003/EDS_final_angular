import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRecipientService {
  private apiUrl = 'https://localhost:7133';

  constructor(private http: HttpClient) { }

  getDataRecipeintTypes(): Observable<DataRecipientService[]> {
    return this.http.get<DataRecipientService[]>(`${this.apiUrl}/api/datarecipients/datarecipienttypes`);
  }
}
