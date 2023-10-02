import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  extractionDate!: Date;
  extractionTime: string = '';
  extractionFrequency: string = '';
  jobs: any[] = [];
  jobName: string = '';
  deliveryMethod: string = 'email';
  showTimeInput: boolean = false;
  startDate!: Date;
  endDate!: Date;
  clientName!: string;
  organizationName!: string;
  selectedDayOfWeek: string = '';
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Define days of the week
  selectedDays: { [key: string]: boolean } = {}; // Initialize selectedDays object
  daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Days 1 to 31
  selectedDayOfMonth: number = 1; // Default value, you can set it to any initial value
  
  
  constructor(private jobService: JobService, private router: Router,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    // Fetch job data from the service
    this.jobService.getJobs().subscribe((jobs: any[]) => {
      this.jobs = jobs;
    });
  }

  goToJobLog() {
    // Add your logic here
  }

  

  goToJobScreen() { 
    this.router.navigate(['/jobs']);
  }

  createJob() {

    if (!this.jobName || !this.extractionFrequency || !this.organizationName || !this.clientName) {
      this.snackBar.open('Job Name, Extraction Frequency, Org Name and client Name are required.', 'Close', {
        duration: 3000,
      });
      return; // Prevent further execution if fields are empty
    } 
    const jobConfig = {
      name: this.jobName,
      frequency: this.extractionFrequency,
      method: this.deliveryMethod,
      extractionTime: this.extractionTime // Add extraction time to job configuration
      // Add more job configuration properties here
    };
    console.log('Job created:'); 
    this.snackBar.open('Job created successfully', 'Close', {
      duration: 3000, 
    }); 
    this.goToJobScreen(); 

     
  }

  onExtractionFrequencyChange() {
    this.showTimeInput = this.extractionFrequency === 'daily';

    // Clear selectedDays when the frequency changes
    this.selectedDays = {};

    // Set extractionDate to null when the frequency is not "once"
    if (this.extractionFrequency !== 'once') {
      this.extractionDate = null as any;
    }
  }

   
}
