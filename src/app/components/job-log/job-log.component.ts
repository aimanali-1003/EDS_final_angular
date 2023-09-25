import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { JobLog } from 'src/app/model/job-log.model';
import { CommonModule } from '@angular/common';
import { JOBLOG } from '../constants/table-headers.constants';

@Component({
  selector: 'app-job-log',
  templateUrl: './job-log.component.html',
  styleUrls: ['./job-log.component.css']
})
export class JobLogComponent implements OnInit {
  jobLogs: any[] = [];
  completedJobLogs: any[] = [];
  ongoingJobLogs: any[] = [];
  headers = JOBLOG;

  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.loadJobLogs();
    this.loggingService.getJobLogs().subscribe((logs: any[]) => {
      this.jobLogs = logs;
    });

  }

  loadJobLogs() {
    this.completedJobLogs = this.loggingService.getCompletedJobLogs();
    this.ongoingJobLogs = this.loggingService.getOngoingJobLogs();
  }

  formatDate(date: number): string {
    const formattedDate = new Date(date * 1000);
    return formattedDate.toLocaleString();
  }

  CreateNewJob(){

  }
}
