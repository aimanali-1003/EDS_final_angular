import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { JobLog } from 'src/app/model/job-log.model';
import { CommonModule } from '@angular/common';
import { JOBLOG } from '../constants/table-headers.constants';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../modal/modal.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-job-log',
  templateUrl: './job-log.component.html',
  styleUrls: ['./job-log.component.css']
})
export class JobLogComponent implements OnInit {
  jobLogs: any[] = [];
  completedJobLogs: any[] = [];
  ongoingJobLogs: any[] = [];
  headers = JOBLOG;

  constructor(private loggingService: LoggingService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadJobLogs();
    this.loggingService.getJobLogs().subscribe((logs: any[]) => {
      this.jobLogs = logs;
    });

  }

  loadJobLogs() {
    this.completedJobLogs = this.loggingService.getCompletedJobLogs();
    this.ongoingJobLogs = this.loggingService.getOngoingJobLogs();
  }

  formatDate(date: number): string {
    const formattedDate = new Date(date * 1000);
    return formattedDate.toLocaleString();
  }

  CreateNewJob(){

  }

  openModalForEdit(catrgoryData?: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Job Log Details',
        fields: [
          { label: 'Job log Name', key: 'categoryName', required: true },
          { label: 'Job Log ID', key: 'categoryId', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false },
          // Add more fields as needed
        ],
        data: catrgoryData || {}, // Pass client data or an empty object
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
}
