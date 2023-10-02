import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
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

  createclient() {
    const clientConfig = {
      name: this.clientName,
      organization: this.organizationName
    }; 
      console.log('Client created:'); 
      this.snackBar.open('Client created successfully', 'Close', {
        duration: 5000, 
      }); 
      this.goToClientScreen(); 
  }
}
