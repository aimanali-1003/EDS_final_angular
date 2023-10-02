import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {  
  organizationName!: string; 
  organizationCode!: string; 
  
  constructor(  private router: Router,private snackBar: MatSnackBar  ) { }

  ngOnInit(): void { 
  }
 

  goToOrgScreen(){
    this.router.navigate(['/orgs']);
  }

  CreateOrg() { 

    if (!this.organizationCode || !this.organizationName) {
      this.snackBar.open('Organization Name and Code are required.', 'Close', {
        duration: 3000,
      });
      return; // Prevent further execution if fields are empty
    }
    this.snackBar.open('Organization created successfully', 'Close', {
      duration: 3000, 
    }); 
    this.goToOrgScreen(); 
  }
}
