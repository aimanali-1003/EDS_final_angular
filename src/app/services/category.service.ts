import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7133';
  
  

  constructor(private http: HttpClient) { }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Categories`);
  }

  getCategoryById(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/categories/${categoryId}`; // Adjust the URL structure to match your API

    return this.http.get(url);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Categories`, categoryData);
  }

  updateCategory(categoryId: string, updatedCategory: any) {
    return this.http.put(`${this.apiUrl}/api/Categories/${categoryId}`, updatedCategory);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/api/Categories/${categoryId}`;
    return this.http.delete(url);
  }

}

