// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  private apiUrl = 'https://localhost:44327'; 

  constructor(private http: HttpClient) { 
    
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

  createDataTemplate(templateData: any, columnsId: string[]): Observable<any> {
    const data = {
        template: templateData,
        selectedColumns: columnsId
    };
    console.log(data);
    return this.http.post<any>(`${this.apiUrl}/api/Templates`, data);
}

  getLastCreatedTemplateId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/templates/lastCreatedId`);
  }


  createTemplateColumns(columnsId: string[]): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/api/Templates`,columnsId);
  }
  
  updateDataTemplate(templateId: string, templateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/template/${templateId}`, templateData);
  }

  deleteDataTemplate(templateId: string): Observable<any> {
    console.log(templateId)
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
