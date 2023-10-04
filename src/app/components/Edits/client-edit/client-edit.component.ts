import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clients: any[] = [];
  clientData: any;
  clientId: string = '';
  organizationName!: string;
  orgs: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
    });

    this.route.params.subscribe((params) => {
      this.clientId = params['clientId'];

      this.loadClientData();
    });
  }

  loadClientData(): void {
    // Fetch client data using this.clientId
    this.clientService.getClient(this.clientId).subscribe((clientData: any) => {
      this.clientData = clientData; 
      console.log('ecwibubhcuierbkrb',this.clientData)
    });
  }

  goToClientScreen() {
    this.router.navigate(['/clients']);
  }

  onSaveChanges(clientName: string, organizationId: string, clientId: string) {
    if (clientId && organizationId) {
      // Update the clientData object with the new organizationId and clientName
      this.clientData.organization = organizationId;
      this.clientData.clientName = clientName; 
  
      // Call the saveclient function with the updated clientData
      this.saveclient(clientId, this.clientData);
    } else {
      console.error('clientId and organizationId are required.');
    }
  }
  

  saveclient(clientID:string, updatedClient: any) {  
    this.clientService.updateClient(clientID,updatedClient).subscribe(() => { 
    });
  }
}
