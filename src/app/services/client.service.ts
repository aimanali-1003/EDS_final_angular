import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:44397';
  
  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientService[]> {
    return this.http.get<ClientService[]>(`${this.apiUrl}/api/Clients`);
  }

  getOrgs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Organizations`);
  }

  createClient(clientData: any): Observable<any> {
    console.log('ABC',clientData)
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
}
