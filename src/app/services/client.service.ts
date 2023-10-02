import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.baseApiUrl;

  private apiOrg = 'https://lr7rg.wiremockapi.cloud';

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientService[]> {
    return this.http.get<ClientService[]>(`${this.apiUrl}/api/client`);
  }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orgs`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/client`, clientData);
  }

  updateClient(clientId: string, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/client/${clientId}`, clientData);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/client/${clientId}`);
  }
}
