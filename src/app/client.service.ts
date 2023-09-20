import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://lr7rg.wiremockapi.cloud';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/client`, clientData);
  }

  updateClient(clientId: string, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/client/${clientId}`, clientData);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/client/${clientId}`);
  }
}
