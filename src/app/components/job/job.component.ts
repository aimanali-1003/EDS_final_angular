import { Component, Input, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { CATEGORY, CLIENT } from '../constants/table-headers.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  showCategoryForm: boolean = false;
  job: any[] = [];
  displayedJob: any[] = []; 
  isEditing = false;
  categoryIdToEdit: string | null = null;
  jobName: string = '';
  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedJob: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];
  headers = CATEGORY;

  constructor(
    private jobService: JobService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { } 
  CreateJobs(){
    this.router.navigate(['/createJob']);
  }
  

  openModalForEdit(catrgoryData?: any): void {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   width: '400px',
    //   data: {
    //     title: 'Edit Job Details',
    //     fields: [
    //       { label: 'Job Name', key: 'jobName', required: true },
    //       { label: 'Job ID', key: 'jobId', required: true },
    //       { label: 'Organization Name', key: 'organizationName', required: false }, 
    //     ],
    //     data: catrgoryData || {},  
    //     isEditing: true  
    //   }
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { 
    //     if (result.isEditing) { 
    //       const updatedData = result.data;  
    //     } else { 
    //       const newData = result.data;  
    //     }
    //   }
    // });
    this.router.navigate(['/editJob']);
  }

  performClientSearch(query: string) {
    // Implement the search logic specific to the 'clients' component
    // Update your displayedCategory based on the query
  }
  
  applyClientFilter(filterData: any) {
    // Implement the filter logic specific to the 'clients' component
    // Update your displayedCategory based on the filter data
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
  

  openClientPopup(client?: any): void {
    const isEditing = !!client; // Check if you are editing an existing client

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: isEditing ? 'Edits Client' : 'Create New Client',
        content: isEditing ? 'Update the client details:' : 'Enter client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: isEditing ? 'Update' : 'Create', // Use different labels for create and update
        updateText: isEditing ? 'Update' : 'Create',
        isUpdate: isEditing, // Set to true for editing, false for creating
        input: isEditing ? client.ClientName : '', // Initialize with client name if editing
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEditing) {
          // Handle the update operation here
          this.updateClient(client, result);
        } else {
          // Handle the create operation here
          this.createNewClient(result);
        }
      }
    });
  }

  updateClient(client: any, updatedValue: string): void { 
  }

  createNewClient(clientName: string): void { 
  }

  

  ngOnInit(): void {
    this.fetchJobs();
    
  }
 
  clearSearch() {
    this.searchTerm = '';  
    this.onSearchChange();  
  }
  
  onSearchChange(event?: Event) {
    if (event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase(); 
      this.displayedJob = this.job.filter(category =>
        category.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {   
      this.searchTerm = '';  
    }
    
  } 

  onPageChange(pageNumber: number) {
    this.updateDisplayedJobs(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedJobs(1);  
  }

   

  editClient(client: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Edits Client',
        content: 'Update the client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: 'Update', // Use 'Update' for editing
        updateText: 'Update', // Use 'Update' for editing
        isUpdate: true, // Set to true for editing
        input: client.name, // Initialize with client name for editing
      },
    });

    dialogRef.afterClosed().subscribe((updatedClientName) => {
      if (updatedClientName) { 
        client.name = updatedClientName; 
      }
    });
  }

  saveJob() {
    if (this.isEditing && this.categoryIdToEdit) { 
      this.jobService.updateJob(this.categoryIdToEdit, { name: this.jobName }).subscribe(() => {
        this.showCategoryForm = false;
        this.fetchJobs();
      });
    } else { 
      this.jobService.createJob({ name: this.jobName }).subscribe(() => {
        this.showCategoryForm = false;
        this.fetchJobs();
      });
    }
  }

  cancelEdit() {
    this.showCategoryForm = false;
  }

  deleteClient(category: any) {
    this.jobService.deleteJob(category.categoryId).subscribe(() => {
      this.job = this.job.filter(c => c.CategoryID !== this.job);
    });
  }
  fetchJobs() {
    this.jobService.getJobs().subscribe((category: any[]) => {
      this.job = category;
      console.log('Category:', this.job); // Log the clients array
      this.updateDisplayedJobs(1);
    });
  }
  
  
  
  private updateDisplayedJobs(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedJob = this.job.slice(startIndex, endIndex);
  }
  
  
}
 