import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private baseUrl = 'https://localhost:44327'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getAllColumns(): Observable<ColumnsService[]> {
    return this.http.get<ColumnsService[]>(`${this.baseUrl}/api/Columns`);
  }

  getColumnById(id: string): Observable<ColumnsService> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ColumnsService>(url);
  }

  createColumn(column: ColumnsService): Observable<ColumnsService> {
    return this.http.post<ColumnsService>(this.baseUrl, column);
  }

  updateColumn(id: string, column: ColumnsService): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, column);
  }

  deleteColumn(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
