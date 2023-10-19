import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private apiUrl = 'https://localhost:7133'; 

  constructor(private http: HttpClient) { }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations`);
  }

  getOrgById(orgID:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations/${orgID}`);
  }

  getOrgDetails(orgId:string): Observable<any[]> {
    console.log("org service", orgId)
    return this.http.get<any[]>(`${this.apiUrl}/api/OrganizationLevels/${orgId}`);
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
