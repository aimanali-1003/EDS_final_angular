import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { JOB } from '../constants/table-headers.constants';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: any[] = [];
  jobName: string = '';
  extractionFrequency: string = 'daily';
  deliveryMethod: string = 'email';
  headers = JOB;

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    // Fetch job data from the service
    this.jobService.getJobs().subscribe((jobs: any[]) => {
      this.jobs = jobs;
    });
  }

  createJob() {
    const jobConfig = {
      name: this.jobName,
      frequency: this.extractionFrequency,
      method: this.deliveryMethod
      // Add more job configuration properties here
    };

    // Call the job service to create and schedule the job
    this.jobService.createJob(jobConfig).subscribe((response) => {
      console.log('Job created:', response);
      // Add any further actions here, such as displaying success messages or updating the job list
    });
  }

  createNewJob() {
    // Navigate to the page for creating a new job
    this.router.navigate(['/jobs/create']);
  }

  editJob(job: any) {
    // Navigate to the page for editing a job, passing the job ID as a parameter
    this.router.navigate(['/jobs/edit', job.id]);
  }

  deleteJob(job: any) {
    // Delete the job using the job service (implement this method in the service)
    this.jobService.deleteJob(job.id).subscribe(() => {
      // Remove the job from the local list
      this.jobs = this.jobs.filter(j => j.id !== job.id);
    });
  }
}
