import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl:string; 
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  getClients(): Observable<ClientService[]> {
    return this.http.get<ClientService[]>(`${this.apiUrl}/api/Clients`);
  }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations`);
  }

  createClient(clientData: any): Observable<any> {
    console.log(clientData)
    return this.http.post<any>(`${this.apiUrl}/api/Clients`, clientData);
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

  getOrgsForClient(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Clients/${clientId}/Organizations`);
  }
  
}
