// job-log.model.ts

export interface JobLog {
    id: number;
    jobId: number;
    timestamp: Date;
    status: string; // Ongoing or Completed
    message: string;
  }
  