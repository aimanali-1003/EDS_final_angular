import { Component, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  
  jobs: any[] = [];
  displayedJob: any[] = []; 
  isEditing = false;
  categoryIdToEdit: string | null = null;
  jobName: string = '';
  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedJob: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];
  jobData: any;
  jobSearchQuery: string="";



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

  viewJob(jobData?: any): void {
    const jobId = jobData.jobID;
    this.router.navigate(['/viewJob/'+jobId+'/'+true]);    
  }
 

  openJobModalForEdit(jobData?: any): void {
    // console.log(this.jobData)
    if (jobData && jobData.jobID) {
      const jobId = jobData.jobID;
      
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
          // console.log(jobId);
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

  private updateDisplayedJobs(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedJob = this.jobs
    .slice(0)
    .sort((a,b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(startIndex, endIndex);
  }

  fetchJobs() {
    this.jobService.getJobs().subscribe((jobs: any[]) => {
      this.jobs = jobs;
      // console.log(jobs);
      this.updateDisplayedJobs(1);
    });
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedJobs(pageNumber);
  }

  // performClientSearch(query: string) {
  //   // Implement the search logic specific to the 'clients' component
  //   // Update your displayedCategory based on the query
  // }
  
  // applyClientFilter(filterData: any) {
  //   // Implement the filter logic specific to the 'clients' component
  //   // Update your displayedCategory based on the filter data
  // }

  performJobSearch(searchTerm: string) {
    this.jobSearchQuery = searchTerm;
    this.displayedJob = this.displayedJob.filter(job =>
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }

  applyJobFilter(filterData: any) {
    this.displayedJob = this.jobs.filter((job) => {
      if (filterData.active !== undefined) {
        return job.active === filterData.active;
      }
      return true; // If no filter is selected, return all clients
    });
  }
}
 