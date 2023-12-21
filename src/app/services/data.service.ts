// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';
import { CategorySM } from '../model/CategoryModel';
import { ResponseViewModel } from '../model/ResponseViewModel';
import { TemplateVM } from '../model/DataTemplateModel';
import {MasterDataModel} from '../model/MasterDataModel';
import { CreateTemplateVM } from '../model/CreateTemplateVM';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  // getCategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/api/Categories`);
  // }

  
  getColumns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/columns`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  getDataTemplates(vm: any): Observable<ResponseViewModel<TemplateVM[]>> {
    const params = new HttpParams({ fromObject: vm });
    return this.http.get<ResponseViewModel<TemplateVM[]>>(`${this.apiUrl}/api/Template/GetTemplates`, { params });
  }

  getTemplate(templateId: number): Observable<ResponseViewModel<TemplateVM>> {
    return this.http.get<ResponseViewModel<TemplateVM>>(`${this.apiUrl}/api/Template/${templateId}`);
  }

  createDataTemplate(newTemplate: CreateTemplateVM): Observable<ResponseViewModel<CreateTemplateVM>> { 
    return this.http.post<ResponseViewModel<CreateTemplateVM>>(`${this.apiUrl}/api/Template`, newTemplate);
}

  getLastCreatedTemplateId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/templates/lastCreatedId`);
  }

  getColumnsOfTemplate(templateId: string): Observable<any> {
    return this.http.get<string[]>(`${this.apiUrl}/api/Templates/GetColumnsOfTemplate?templateId=${templateId}`);
  }

  createTemplateColumns(columnsId: string[]): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/api/Template`,columnsId);
  }
  
  updateDataTemplate( templateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/Template/`, templateData);
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

  getAllGroupLookups(): Observable<MasterDataModel[]> {
    return this.http.get<MasterDataModel[]>(`${this.apiUrl}/api/MasterData/GetAllGroupLookups`);
  }


  getJobs(templateId: number): Observable<any> {
    const params = {
      pageSize: 10,
      pageNumber: 1,
      templateId: templateId
    };

    return this.http.get<any>(`${this.apiUrl}/api/Job/GetJobs`, { params });
  }
}
