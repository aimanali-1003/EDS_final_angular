import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations`);
  }

  getOrgById(orgID:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations/${orgID}`);
  }

  getOrgDetails(orgId:string): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/api/OrganizationLevels/${orgId}`);
  } 
  getClientsForOrganization(orgId: number): Observable<any[]> {
    const url = `${this.apiUrl}/api/Organizations/${orgId}/clients`;
    return this.http.get<any[]>(url);
  }
  getChildOrgs(orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations/${orgId}/childOrganizations`);
  }
}
