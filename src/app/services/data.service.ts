// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Categories`);
  }

  getColumns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/columns`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  getDataTemplates(): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/api/Templates`);
  }
  getTemplate(templateId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Templates/${templateId}`);
  }

  createDataTemplate(templateData: any): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/api/Templates`, templateData);
}

  getLastCreatedTemplateId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/templates/lastCreatedId`);
  }

  getColumnsOfTemplate(templateId: string): Observable<any> {
    return this.http.get<string[]>(`${this.apiUrl}/api/Templates/GetColumnsOfTemplate?templateId=${templateId}`);
  }

  createTemplateColumns(columnsId: string[]): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/api/Templates`,columnsId);
  }
  
  updateDataTemplate(templateId: string, templateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/Templates/${templateId}`, templateData);
  }

  deleteDataTemplate(templateId: string): Observable<any> { 
    return this.http.delete<any>(`${this.apiUrl}/api/Templates/${templateId}`);
  }

  getCategoryColumns(categoryId: number) {
    const url = `${this.apiUrl}/api/category-columns/${categoryId}`;
    return this.http.get(url);
  }

  getColumnsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/columns/byCategory/${categoryId}`);
  }

   



}
