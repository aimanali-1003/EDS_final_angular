import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';
import { ResponseViewModel } from '../model/ResponseViewModel';
import { OrgDataModel } from '../model/OrgDataModel';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllOrganizations`);
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
  searchOrgs(searchTerm: string): Observable<ResponseViewModel<OrgDataModel[]>> {
    // Ensure the searchTerm is properly encoded
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    
    // Use template string to format the URL with the encoded search term
    return this.http.get<ResponseViewModel<OrgDataModel[]>>(`${this.apiUrl}/api/Organization/search/${encodedSearchTerm}`);
  }
  
}
