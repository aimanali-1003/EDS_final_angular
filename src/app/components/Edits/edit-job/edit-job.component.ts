import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

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

  editJob() {
 
    const jobConfig = {
      name: this.jobName,
      frequency: this.extractionFrequency,
      method: this.deliveryMethod,
      extractionTime: this.extractionTime  
    }; 
    this.snackBar.open('Job edited successfully', 'Close', {
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
