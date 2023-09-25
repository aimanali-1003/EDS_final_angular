 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../../org.model';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { OrgService } from 'src/app/services/org.service';

@Component({
  selector: 'app-org-management',
  templateUrl: './org-management.component.html',
  styleUrls: ['./org-management.component.css']
})
export class OrgManagementComponent implements OnInit {
  displayedOrganization: any[] = []; 
  displayedColumns: string[] = ['id', 'OrgName', 'OrgCode', 'actions'];
  orgs: Organization[] = [];
  showOrgForm: boolean = false;
  isEditing = false;
  orgIdToEdit: string | null = null;
  OrgName: string = '';
  newOrg: Organization = {
    id: '',
    OrgName: '',
    OrgCode: '',
    ClientID: 0,
    CreatedAt: 0,
    CreatedBy: '',
    UpdatedAt: 0,
    UpdatedBy: '',
    Active: false
  };

  cancelEdit() {
    this.showOrgForm = false;
  }

  constructor(private http: HttpClient,
    private org: OrgService,
    private data: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {}

  ngOnInit() {
    // this.loadOrgs();
    this.fetchOrgs();
  }

  saveOrg() {
    
  }

  // loadOrgs() {
  //   this.http.get<Organization[]>('https://lr7rg.wiremockapi.cloud/orgs').subscribe(orgs => {
  //     this.orgs = orgs;
  //   });
  // }

  fetchOrgs() {
    this.org.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
      console.log('Organization:', this.orgs); // Log the clients array
      // this.updateDisplayedClients(1);
    });
  }

  openModalForEdit(clientData?: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Client Details',
        fields: [
          { label: 'Client Name', key: 'clientName', required: true },
          { label: 'Client ID', key: 'clientId', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false },
          // Add more fields as needed
        ],
        data: clientData || {}, // Pass client data or an empty object
        isEditing: true // Set the editing flag to true
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the updated client data here
        if (result.isEditing) {
          // This means it's an update operation
          const updatedData = result.data; // Updated data
          // Perform update logic with updatedData
        } else {
          // This means it's a create operation
          const newData = result.data; // New data
          // Perform create logic with newData
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Successfully Deleted', 'Cancel', {
          duration: 2000,
        });
      }
    });
  }

  // createOrg() {
  //   this.http.post('https://lr7rg.wiremockapi.cloud/orgs', this.newOrg).subscribe(() => {
  //     this.loadOrgs(); // Refresh the organization list
  //     this.newOrg = {  // Clear the form fields
  //       id: '',
  //       OrgName: '',
  //       OrgCode: '',
  //       ClientID: 0,
  //       CreatedAt: 0,
  //       CreatedBy: '',
  //       UpdatedAt: 0,
  //       UpdatedBy: '',
  //       Active: false
  //     };
  //   });
  // }

  // updateOrg(org: Organization) {
  //   this.http.put(`https://lr7rg.wiremockapi.cloud/orgs/${org.id}`, org).subscribe(() => {
  //     this.loadOrgs(); // Refresh the organization list
  //   });
  // }

  // deleteOrg(id: string) {
  //   this.http.delete(`https://lr7rg.wiremockapi.cloud/orgs/${id}`).subscribe(() => {
  //     this.loadOrgs(); // Refresh the organization list
  //   });
  // }

  openModalForCreate(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Create Client',
        fields: [
          { label: 'Client Name', key: 'clientName', required: true },
          { label: 'Client ID', key: 'clientId', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false },
          // Add more fields as needed
        ],
        isEditing: false // Explicitly set it to false for a create operation
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the created client data here
        const newData = result.data; // New data
        // Perform create logic with newData
      }
    });
  }

  

}
