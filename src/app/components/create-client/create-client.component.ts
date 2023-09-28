import { Component, OnInit } from '@angular/core';

import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  extractionDate!: Date;
  extractionTime: string = '';
  extractionFrequency: string = '';
  clients: any[] = [];
  clientName: string = ''; 
  organizationName!: string; 
  
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    // Fetch client data from the service
    this.clientService.getClients().subscribe((clients: any[]) => {
      this.clients = clients;
    });
  }

  goToclientLog() {
    // Add your logic here
  }

  goToNextComponent() { 
  }

  createclient() {
    const clientConfig = {
      name: this.clientName,
      frequency: this.extractionFrequency, 
      extractionTime: this.extractionTime  
    };

    // Call the client service to create and schedule the client
    this.clientService.createClient(clientConfig).subscribe((response) => {
      console.log('client created:', response); 
    });
  }
 
}
