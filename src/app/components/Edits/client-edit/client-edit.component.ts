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
    this.clientService.getClient(this.clientId).subscribe((clientData: any) => {
      this.clientData = clientData;

      // Set the client's organization based on the data received
      this.clientData.organization = this.findOrganization(this.clientData.organizationID);
    });
  }

  findOrganization(clientOrganizationID: string): any {
    return this.orgs.find((org) => org.organizationID === clientOrganizationID);
  }

  goToClientScreen() {
    this.router.navigate(['/clients']);
  }

  onSaveChanges(clientName: string, organizationID: string, clientStatus: boolean) {
    // Update the clientData object with the new organizationId, clientName, and status
    this.clientData.organizationID = organizationID;
    this.clientData.clientName = clientName;
    this.clientData.active = clientStatus;
  
    const currentDatetime = new Date();
    this.clientData.updatedAt = currentDatetime.toISOString();
    this.clientData.updatedBy = 'ABC';
  
    // Call the saveClient function with the updated clientData
    this.saveClient(this.clientId, this.clientData);
    console.log(this.clientData);
  }
  

  saveClient(clientID: string, updatedClient: any) {
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
