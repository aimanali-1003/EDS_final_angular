import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  clients: any[] = [];
  clientName: string = '';
  organizationName!: string;
  orgs: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(): void { 
    this.clientService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs;
    });
  }

  goToClientScreen() { 
    this.router.navigate(['/clients']);
  }

  saveclient() {

     
    const clientConfig = {
      name: this.clientName,
      organization: this.organizationName
    }; 
      console.log('Client created:'); 
      this.snackBar.open('Client edited successfully', 'Close', {
        duration: 3000, 
      }); 
      this.goToClientScreen(); 
  }

}
