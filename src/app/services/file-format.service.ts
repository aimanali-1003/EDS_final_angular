import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileFormatService {

  private apiUrl = 'https://localhost:44327';

  constructor(private http: HttpClient) { }

  getfileFormats(): Observable<FileFormatService[]> {
    return this.http.get<FileFormatService[]>(`${this.apiUrl}/api/jobs/fileformat`);
  }
}
