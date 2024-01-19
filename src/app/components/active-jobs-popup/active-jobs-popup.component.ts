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
  displayedColumns: string[] = ['jobType', 'jobID', 'startTime', 'maxRecordCountAlarm','minRecordCountAlarm', 'createdBy'];  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { activeJobs: any[] },
    public dialogRef: MatDialogRef<ActiveJobsPopupComponent>
  ) {
    this.activeJobs = data.activeJobs;
  }

  ngOnInit(): void { 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
