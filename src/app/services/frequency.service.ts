import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  private apiUrl = 'https://localhost:44327';

  constructor(private http: HttpClient) { }

  getFrequency(): Observable<FrequencyService[]> {
    return this.http.get<FrequencyService[]>(`${this.apiUrl}/api/frequencies`);
  }
}
