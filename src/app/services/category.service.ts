import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:44397';
  
  

  constructor(private http: HttpClient) { }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Categories`);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Categories`, categoryData);
  }

  updateCategory(categoryId: string, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/category/${categoryId}`, categoryData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Categories/${categoryId}`);
  }
}
