import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Organization } from '../../org.model';
import { OrgService } from 'src/app/services/org.service';
import { ModalComponent } from '../modal/modal.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-management',
  templateUrl: './org-management.component.html',
  styleUrls: ['./org-management.component.css'],
})
export class OrgManagementComponent implements OnInit {
  displayedOrganization: Organization[] = [];
  displayedColumns: string[] = ['id', 'OrgName', 'OrgCode', 'actions'];
  orgs: Organization[] = [];
  showOrgForm: boolean = false;
  isEditing = false;
  orgIdToEdit: string | null = null;
  OrgName: string = '';
  pageSize: number = 10;
  newOrg: Organization = {
    id: '',
    OrgName: '',
    OrgCode: '',
    ClientID: 0,
    CreatedAt: 0,
    CreatedBy: '',
    UpdatedAt: 0,
    UpdatedBy: '',
    Active: false,
  };

  constructor(
    private orgService: OrgService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchOrgs(); 
    
  }

  fetchOrgs() {
    this.orgService.getOrgs().subscribe((orgs: Organization[]) => {
      this.orgs = orgs; 
      this.updateDisplayedOrgs(1);
    });
  }

  openModalForEdit(orgData?: Organization): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Organization Details',
        fields: [
          { label: 'Organization Name', key: 'OrgName', required: true },
          { label: 'Organization Code', key: 'OrgCode', required: true },
        ],
        data: orgData || {},
        isEditing: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isEditing) {
          const updatedData = result.data;
          // Perform update logic with updatedData
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Perform delete logic
        this.snackBar.open('Successfully Deleted', 'Cancel', {
          duration: 2000,
        });
      }
    });
  }

  openModalForCreate(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Create Organization',
        fields: [
          { label: 'Organization Name', key: 'OrgName', required: true },
          { label: 'Organization Code', key: 'OrgCode', required: true },
        ],
        isEditing: false, // Explicitly set it to false for a create operation
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newOrgData = result.data;
        // Perform create logic with newOrgData
      }
    });
  }

  // Add the saveOrg method to handle organization creation/update
  saveOrg(): void {
    // Add logic to create/update the organization here
    if (this.isEditing) {
      // Update organization logic
    } else {
      // Create organization logic
    }
  }

  // Add the cancelEdit method to cancel organization editing
  cancelEdit(): void {
    this.isEditing = false;
    // Reset any form fields or variables used for editing
  }

  CreateOrg(){
    this.router.navigate(['/createOrg']);
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedOrgs(pageNumber);
  }
  
  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedOrgs(1);  
  }

  
  private updateDisplayedOrgs(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedOrganization = this.orgs.slice(startIndex, endIndex);
  }
  
}
