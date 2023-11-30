import { Component, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { JobVM } from 'src/app/model/JobModel';
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
  jobss: JobVM[] = [];
  currentPage: number = 1; // Track current page
  totalJobs = 0; 
  // pageSize = 10; // Define your page size



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
          this.router.navigate(['/viewJob/'+jobId+'/'+true]);  // Routing to create-client component with client ID
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

  fetchJobs(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };
  
    this.jobService.getJobs(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.jobss = this.jobss.concat(response.itemList);
          this.totalJobs = +response.totalCount;
        }
      },
      (error) => {
        console.error('Error fetching Jobs:', error);
      }
    );
  }

  loadMoreJobs(): void {
    // Assuming there are more jobs available based on some condition (e.g., totalJobs > jobs.length)
    if (this.totalJobs > this.jobs.length) {
      this.currentPage++; // Increment current page
      this.fetchJobs(); // Fetch more jobs for the next page
    }
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
    this.jobss = this.jobss.filter((job) => {
      if (filterData.active !== undefined) {
        return job.isActive === filterData.active;
      }
      return true;
    });
  }
}