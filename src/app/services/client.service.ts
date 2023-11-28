import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/config';
import { ApiResponse, ClientVM, clientDataModel } from '../model/ClientModel';
import { ResponseViewModel } from '../model/ResponseViewModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }
  
  // getClients(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(`${this.apiUrl}/GetAllClients`);
  // }

  // createClient(newClient: ClientVM): Observable<ApiResponse<number>> {
  //   return this.http.post<ApiResponse<number>>(`${this.apiUrl}/createClient`, newClient);
  // }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations`);
  }

  // createClient(clientData: any): Observable<any> {
  //   console.log(clientData)
  //   return this.http.post<any>(`${this.apiUrl}/api/Clients`, clientData);
  // }

  createClient(newClient: ClientVM): Observable<ResponseViewModel<ClientVM>> {
    return this.http.post<ResponseViewModel<ClientVM>>(`${this.apiUrl}/api/Client`, newClient);
  }

  updateClient(clientId: string, clientData: any): Observable<any> { 
    console.log(clientId,clientData); 
    return this.http.put<any>(`${this.apiUrl}/api/Clients/${clientId}`, clientData);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Clients/${clientId}`);
  } 

  getClient(clientId: string): Observable<string> { 
    return this.http.get<any>(`${this.apiUrl}/api/Clients/${clientId}`);
  }

  getClientById(clientId: number): Observable<ResponseViewModel<ClientVM>> {
    return this.http.get<ResponseViewModel<ClientVM>>(`${this.apiUrl}/api/Client/${clientId}`);
  }

  getOrgsForClient(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Clients/${clientId}/Organizations`);
  }

  getClients(vm: any): Observable<ResponseViewModel<ClientVM[]>> {
    const params = new HttpParams({ fromObject: vm });
    return this.http.get<ResponseViewModel<ClientVM[]>>(`${this.apiUrl}/api/Client/GetClients`, { params });
  }
  
}
