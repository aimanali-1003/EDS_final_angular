import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  private apiUrl = 'https://lr7rg.wiremockapi.cloud';

  constructor(private http: HttpClient) { }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orgs`);
  }

  createOrgs(orgData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orgs`, orgData);
  }

  updateOrgs(orgId: string, orgData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orgs/${orgId}`, orgData);
  }

  deleteOrgs(orgId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/orgs/${orgId}`);
  }

}
