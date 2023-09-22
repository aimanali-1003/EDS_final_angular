import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { JobLog } from 'src/app/model/job-log.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-log',
  templateUrl: './job-log.component.html',
  styleUrls: ['./job-log.component.css']
})
export class JobLogComponent implements OnInit {
  jobLogs: any[] = [];
  completedJobLogs: any[] = [];
  ongoingJobLogs: any[] = [];


  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.loadJobLogs();
    // Fetch job log data from the service
    this.loggingService.getJobLogs().subscribe((logs: any[]) => {
      this.jobLogs = logs;
    });
    
  }

  loadJobLogs() {
    // Load completed job logs
    this.completedJobLogs = this.loggingService.getCompletedJobLogs();
    console.log(this.completedJobLogs);

    // Load ongoing job logs
    this.ongoingJobLogs = this.loggingService.getOngoingJobLogs();
  }

  formatDate(date: number): string {
    const formattedDate = new Date(date * 1000); // Convert Unix timestamp to milliseconds
    return formattedDate.toLocaleString(); // Adjust formatting as needed
  }
}
