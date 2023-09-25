import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  extractionTime: string = ''; // Property for the time input

  extractionFrequency: string = '';
  jobs: any[] = [];
  jobName: string = '';
  deliveryMethod: string = 'email';
  showTimeInput: boolean = false;
  startDate!: Date;
endDate!: Date;
clientName!: string; // Declare the clientName property
  organizationName!: string;


  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    // Fetch job data from the service
    this.jobService.getJobs().subscribe((jobs: any[]) => {
      this.jobs = jobs;
    });
  }

  goToJobLog(){

  }

  goToNextComponent() {
    // Assuming you have configured a route for the "Job" component in your app-routing.module.ts
    this.router.navigate(['/joblog']);
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

  // createNewJob() {
  //   // Navigate to the page for creating a new job
  //   this.router.navigate(['/jobs/create']);
  // }

  // editJob(job: any) {
  //   // Navigate to the page for editing a job, passing the job ID as a parameter
  //   this.router.navigate(['/jobs/edit', job.id]);
  // }

  // deleteJob(job: any) {
  //   // Delete the job using the job service (implement this method in the service)
  //   this.jobService.deleteJob(job.id).subscribe(() => {
  //     // Remove the job from the local list
  //     this.jobs = this.jobs.filter(j => j.id !== job.id);
  //   });
  // }

  onExtractionFrequencyChange() {
    // Set showTimeInput to true if "Daily" is selected, false otherwise
    this.showTimeInput = this.extractionFrequency === 'daily';
  }

}
