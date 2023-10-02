import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
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
  logs: any[] = [];
  pageSize: number = 10;
  headers = JOBLOG;
  displayedJobLog: any[] = [];
  currentPage: number = 1; // Initialize to page 1

  constructor(
    private loggingService: LoggingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadJobLogs();
  }

  loadJobLogs() {
    this.loggingService.getJobLogs().subscribe((logs: any[]) => {
      this.logs = logs; 
      this.updateDisplayedJoblogs(1); // Initial display
    });
  }

  formatDate(date: number): string {
    const formattedDate = new Date(date * 1000);
    return formattedDate.toLocaleString();
  }

  openModalForEdit(categoryData?: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Job Log Details',
        fields: [
          { label: 'Job log Name', key: 'categoryName', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false },
          { label: 'Job Duration', key: 'JobRunDuration', required: true },
          { label: 'Extract Success', key: 'ExtractSuccess', required: true },
          { label: 'Notification Recipient Success', key: 'NotificationRecipientSuccess', required: true },
          { label: 'Extracted Record Count', key: 'ExtractedRecordCount', required: true },
          { label: 'Active', key: 'Active', required: true },
          // Add more fields as needed
        ],
        data: categoryData || {}, // Pass job log data or an empty object
        isEditing: true // Set the editing flag to true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the updated job log data here
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
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
          duration: 2000
        });
      }
    });
  }

  onPageChange(pageNumber: number) { 
    this.updateDisplayedJoblogs(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedJoblogs(1);
  }

  private updateDisplayedJoblogs(currentPage: number) {
    const startIndex = (currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedJobLog = this.logs.slice(startIndex, endIndex);
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
