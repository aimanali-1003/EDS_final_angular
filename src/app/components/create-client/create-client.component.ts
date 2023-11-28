import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { ApiResponse,clientDataModel } from 'src/app/model/ClientModel';
import { OrgService } from 'src/app/services/org.service';
import { ClientVM } from 'src/app/model/ClientModel';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  clientName: string = '';
  organizationLevel!: string;
  orgs: any[] = [];
  currentDatetime = new Date();
  clientCode: string = '';
  clientId!: number;
  isEdit:boolean = false;
  isViewOnly:boolean = false;
  clientOrg: any[] = [];
  selectedOrganization: any; 
  organizations: any[] = [];
  clients: clientDataModel[] = [];
  clientData: ClientVM = new ClientVM()

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private organizationService: OrgService,
  ) {

  }

  ngOnInit(): void { 

    this.fetchOrganizations();
    this.clientService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
    });

    this.route.params.subscribe((params) => {
      this.clientId = +params['clientId'];
      this.isViewOnly = params['isViewOnly'];
      if (this.clientId) {
        this.clientService.getClientById(this.clientId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.clientData = response.data;
              // Handle the retrieved client data here
            } else {
              console.error('No client found or unsuccessful response.');
              // Handle error cases or no client found
            }
          },
          (error) => {
            console.error('Error fetching client:', error);
            // Handle error cases
          }
        );
      }

      // if(this.clientId != undefined && this.clientId != "" && this.clientId != null && this.clientId != ''){
      //   this.isEdit = true;
      //   this.loadClientOrganization();
      //   this.loadClientData();
      // }
    });
  }

  onCreateClientSubmit(): void {
    this.clientService.createClient(this.clientData).subscribe(
      (response: any) => {
        this.snackBar.open('Client created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/clients']);
      },
      (error: any) => {
        this.snackBar.open('Error creating client: ' + error.error.message, 'Close', {
          duration: 3000,
        });
      }
    );
  }

  fetchOrganizations(): void {
    this.organizationService.getOrgs().subscribe((organizations: any[]) => {
      this.organizations = organizations;
      console.log(this.organizations)
    });
  }

  // loadClientOrganization(): void {
  //   this.clientService.getOrgsForClient(this.clientId).subscribe((clientOrg: any[]) => {
  //     this.clientOrg = clientOrg;
  
  //     if (this.clientOrg.length > 0) {
  //       const organizationID = this.clientOrg[0].organizationID;
  //       this.selectedOrganization = this.orgs.find(org => org.organizationID === organizationID);
  //     }
  //   });
  // }
  

  goToClientScreen() { 
    this.router.navigate(['/clients']);
  }

  ValidateFormFields(){
    if (!this.clientData) {
      this.snackBar.open('Client Name is required.', 'Close', {
        duration: 3000,
      });
      return;
    }

    if(!this.selectedOrganization.organizationLevel){
      this.snackBar.open('Organization Name is required.', 'Close', {
        duration: 3000,
      });
      return;
    }
  }
}
