import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service'; // Import your logging service
import { JobLog } from '../model/job-log.model';

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

    // Load ongoing job logs
    this.ongoingJobLogs = this.loggingService.getOngoingJobLogs();
  }
}
