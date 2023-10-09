// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  private apiUrl = 'https://localhost:44397'; 

  constructor(private http: HttpClient) { 
    
  }

  getTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/template`);
  }

  getCategories(): Observable<DataService[]> {
    return this.http.get<DataService[]>(`${this.apiUrl}/api/Categories`);
  }

  getColumns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/columns`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client`);
  }

  getDataTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Templates`);
  }

  createDataTemplate(templateData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/template`, templateData);
  }

  updateDataTemplate(templateId: string, templateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/template/${templateId}`, templateData);
  }

  deleteDataTemplate(templateId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/template/${templateId}`);
  }
}
