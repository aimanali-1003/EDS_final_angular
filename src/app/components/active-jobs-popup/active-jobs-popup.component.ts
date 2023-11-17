// active-jobs-popup.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-active-jobs-popup',
  templateUrl: './active-jobs-popup.component.html',
  styleUrls: ['./active-jobs-popup.component.css']
})
export class ActiveJobsPopupComponent implements OnInit {
  activeJobs: any[] = [];
  displayedColumns: string[] = ['jobType', 'jobID', 'startTime', 'maxRecordCountAlarm','minRecordCountAlarm', 'createdBy']; // Add more column names as needed

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { activeJobs: any[] },
    public dialogRef: MatDialogRef<ActiveJobsPopupComponent>
  ) {
    this.activeJobs = data.activeJobs;
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
