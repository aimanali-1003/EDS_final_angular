import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CommonService } from '../shared/config';
import { ResponseViewModel } from '../model/ResponseViewModel';
import { OrgDataModel } from '../model/OrgDataModel';
import { OrganizationSearchSM } from '../model/OrganizationSearch.model';

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
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    return this.http.get<ResponseViewModel<OrgDataModel[]>>(`${this.apiUrl}/api/Organization/search/${encodedSearchTerm}`);
  }

  getOrganizationLevels(searchParams: OrganizationSearchSM): Observable<ResponseViewModel<OrgDataModel[]>> {
    const { PageNumber, PageSize, ParentCode, ReqGridLevel, ConsolidatedCode, RollupCode, GPOCode, GroupCode, UnitCode, SearchText } = searchParams;
    let params = new HttpParams()
      .set('PageNumber', PageNumber.toString())
      .set('PageSize', PageSize.toString());
  
    // Conditionally add optional parameters if they exist
    if (ParentCode) {
      params = params.set('ParentCode', ParentCode);
    }
    if (ReqGridLevel) {
      params = params.set('ReqGridLevel', ReqGridLevel);
    }
    if (ConsolidatedCode) {
      params = params.set('ConsolidatedCode', ConsolidatedCode);
    }
    if (RollupCode) {
      params = params.set('RollupCode', RollupCode);
    }
    if (GPOCode) {
      params = params.set('GPOCode', GPOCode);
    }
    if (GroupCode) {
      params = params.set('GroupCode', GroupCode);
    }
    if (UnitCode) {
      params = params.set('UnitCode', UnitCode);
    }

    if(SearchText){
      params = params.set('SearchText', SearchText);
    }
  
    return this.http.get<ResponseViewModel<OrgDataModel[]>>(
      `${this.apiUrl}/api/Organization/GetOrganizationLevels`, { params }
    );
  }
  
  

}
