import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-joblog',
  templateUrl: './edit-joblog.component.html',
  styleUrls: ['./edit-joblog.component.css']
})
export class EditJoblogComponent implements OnInit {

  organizationName!: string; 
  organizationCode!: string; 
  jobDuration!: string; // Add this property
  extractSuccess!: string; // Add this property
  notificationRecipientSuccess!: string; // Add this property
  extractedRecordCount!: string; // Add this property
  active!: string; // Add this property

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void { 
  }

  goToJoblogScreen() {
    this.router.navigate(['/job-logs']);
  }

  saveJoblog() { 
    // Handle saving job log with the updated properties
    this.snackBar.open('Joblog Edited successfully', 'Close', {
      duration: 3000, 
    }); 
    this.goToJoblogScreen(); 
  }
}
