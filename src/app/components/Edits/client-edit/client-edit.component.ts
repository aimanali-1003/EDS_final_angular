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
  clientOrg: any[] = [];
  selectedOrganization: any; 

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
      console.log('Load all organizations', this.orgs)
    });

    this.route.params.subscribe((params) => {
      this.clientId = params['clientId'];
      this.loadClientData();
      this.loadOrganization();
    });
  }

  loadClientData(): void {
    this.clientService.getClient(this.clientId).subscribe((clientData: any) => {
      this.clientData = clientData;
      console.log(this.clientData);
    });
  }

  loadOrganization(): void {
    // Assuming you have a method in your service to load organizations by client ID
    this.clientService.getOrgsForClient(this.clientId).subscribe((clientOrg: any[]) => {
      this.clientOrg = clientOrg;
  
      if (this.clientOrg.length > 0) {
        const organizationID = this.clientOrg[0].organizationID;
        this.selectedOrganization = this.orgs.find(org => org.organizationID === organizationID);
      }
    });
  }
  


  goToClientScreen() {
    this.router.navigate(['/clients']);
  }

  onSaveChanges() {
    if (!this.clientData) {
      // Handle the case when clientData is not available
      return;
    }
  
    const updatedClientData = {
      clientName: this.clientData.clientName,
      organizationID: this.selectedOrganization?.organizationID, // Use selectedOrganization
      active: this.clientData.active, // Assuming you have an active property
      clientCode: this.clientData.clientCode
    };
  
    this.clientService.updateClient(this.clientId, updatedClientData).subscribe(
      (response: any) => {
        this.snackBar.open('Client updated successfully', 'Close', {
          duration: 2000,
        });
  
        this.router.navigate(['/clients']); // Navigate back to the clients list
      },
      (error: any) => {
        this.snackBar.open('Error updating client', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
