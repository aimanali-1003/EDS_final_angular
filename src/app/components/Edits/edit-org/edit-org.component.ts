import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {

  organizationName!: string; 
  organizationCode!: string; 
  
  constructor(  private router: Router,private snackBar: MatSnackBar  ) { }

  ngOnInit(): void { 
  }
 

  goToOrgScreen(){
    this.router.navigate(['/orgs']);
  }

  saveOrg() { 
 
    this.snackBar.open('Organization edited successfully', 'Close', {
      duration: 3000, 
    }); 
    this.goToOrgScreen(); 
  }
}
