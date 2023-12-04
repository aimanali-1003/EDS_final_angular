import { Component, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { JobVM } from 'src/app/model/JobModel';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @ViewChild('paginatorRef') paginator!: MatPaginator;

  jobs: any[] = [];
  displayedJob: JobVM[] = [];
  isEditing = false;
  categoryIdToEdit: string | null = null;
  jobName: string = '';
  pageSize: number = 10;
  searchTerm: string = '';
  selectedJob: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];
  jobData: any;
  jobSearchQuery: string="";
  jobss: JobVM[] = [];
  pageNumber: number = 1;
  totalJobs = 0; 

  constructor(
    private jobService: JobService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { } 

  
  ngOnInit(): void {
    this.fetchJobs(); 
    
  }

  CreateJobs(){
    this.router.navigate(['/createJob']);
  }

  viewJob(jobId: number): void {
    this.jobService.getJob(jobId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const job: JobVM = response.data;
          this.router.navigate(['/viewJob/'+jobId+'/'+true]);
        } else {
          console.error('No client found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );   
  }
 

  openJobModalForEdit(jobId:number): void { 
    if (jobId) {  
      this.router.navigate(['/editJob', jobId]);
    }
  }

  deleteJob(job: any): void {
    const jobId = job.jobID;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this job?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.jobService.deleteJob(jobId).subscribe(() => {
          this.jobs = this.jobs.filter(c => c.jobID !== jobId);
          this.updateDisplayedJobs(1);
          this.snackBar.open('Job successfully deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
          console.error('Error deleting job:', error);
          this.snackBar.open('Error deleting job', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }

  fetchJobs(): void {  
    this.jobService.getJobs({ pageSize: this.pageSize, pageNumber: this.pageNumber })
      .subscribe(
        (response) => {
          if (response.code === 200 && response.itemList) {
            this.jobss = response.itemList;
            this.totalJobs = +response.totalCount;
            this.updateDisplayedJobs(this.pageNumber);
          }
        },
        (error) => {
          console.error('Error fetching Jobs:', error);
        }
      );
  }

  updateDisplayedJobs(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedJob = this.jobss.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchJobs();
  }

  applyJobFilter(filterData: any) {
    this.jobss = this.jobss.filter((job) => {
      if (filterData.active !== undefined) {
        return job.isActive === filterData.active;
      }
      return true;
    });
  }
}
