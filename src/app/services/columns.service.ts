import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getAllColumns(): Observable<ColumnsService[]> {
    return this.http.get<ColumnsService[]>(`${this.apiUrl}/api/Columns`);
  }

  getColumnById(id: string): Observable<ColumnsService> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ColumnsService>(url);
  }

  createColumn(column: ColumnsService): Observable<ColumnsService> {
    return this.http.post<ColumnsService>(this.apiUrl, column);
  }

  updateColumn(id: string, column: ColumnsService): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, column);
  }

  deleteColumn(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
