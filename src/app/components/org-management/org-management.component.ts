import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
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
  displayedOrganization: any[] = [];
  displayedColumns: string[] = ['id', 'OrgName', 'OrgCode', 'actions'];
  orgs: any[] = [];
  showOrgForm: boolean = false;
  isEditing = false;
  orgIdToEdit: string | null = null;
  OrgName: string = '';
  pageSize: number = 10; 

  constructor(
    private orgService: OrgService, 
  ) {}

  ngOnInit() { 
    this.fetchOrgs();  
  } 

  fetchOrgs() {
    this.orgService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
      this.displayedOrganization=orgs;
      console.log(this.orgs);
      this.updateDisplayedOrgs(1);
    });
    
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

  performClientSearch(query: string) {
    // Implement the search logic specific to the 'clients' component
    // Update your displayedCategory based on the query
  }
  
  applyClientFilter(filterData: any) {
    // Implement the filter logic specific to the 'clients' component
    // Update your displayedCategory based on the filter data
  }
  
}
