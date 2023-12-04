import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { clientDataModel } from 'src/app/model/ClientModel';
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
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe((params) => {
      this.clientId = +params['clientId'];
      this.isViewOnly = params['isViewOnly'];
      if (this.clientId) {
        this.isEdit = true;
        this.clientService.getClientById(this.clientId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.clientData = response.data;
            } else {
              console.error('No client found or unsuccessful response.');
            }
          },
          (error) => {
            console.error('Error fetching client:', error);
          }
        );
      }
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

  goToClientScreen() { 
    this.router.navigate(['/clients']);
  }

  createUpdateClient(): void {
    this.isEdit = true;

    if (this.isEdit) {
        this.clientService.updateClient(this.clientData).subscribe(
            (response) => {
                this.snackBar.open('Client edited successfully', 'Close', {
                    duration: 3000,
                });
                this.router.navigate(['/clients']);
            },
            (error) => {
                const errorMessage = ((error as any)?.error?.message) || error.message || 'An error occurred while updating the client.';

                console.error('Error updating job:', error);
                this.snackBar.open('Error updating job: ' + errorMessage, 'Close', {
                    duration: 3000,
                });
            }
        );
    }
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
