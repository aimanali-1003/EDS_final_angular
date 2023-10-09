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
      console.log('Client Data:', this.clientData);
    });
  }

  goToClientScreen() {
    this.router.navigate(['/clients']);
  }

  onSaveChanges(clientName: string, clientId: string, organizationId: string, clientStatus: boolean) {
    if (clientId && organizationId) {
      // Update the clientData object with the new organizationId, clientName, and status
      this.clientData.organization = organizationId;
      this.clientData.clientName = clientName;
      this.clientData.active = clientStatus;
  
      const currentDatetime = new Date();
      this.clientData.updatedAt = currentDatetime.toISOString();
      this.clientData.updatedBy='ABC';
      // Call the saveclient function with the updated clientData
      this.saveclient(this.clientId, this.clientData);
      console.log(this.clientData)
    } else {
      console.error('clientId and organizationId are required.');
    }
  }
  

  saveclient(clientID: string, updatedClient: any) {  
    this.clientService.updateClient(clientID, updatedClient).subscribe(() => { 
      // Show a success message or perform other actions as needed
      this.snackBar.open('Client updated successfully', 'Close', {
        duration: 2000,
      });

      // Navigate back to the clients list
      this.router.navigate(['/clients']);
    });
  }
}
