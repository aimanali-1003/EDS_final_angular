import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { ClientDialogService } from '../client-dialog.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  displayedClients: any[] = [];
  showClientForm = false;
  isEditing = false;
  clientIdToEdit: string | null = null;
  clientName: string = '';
  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedClient: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientDialogService: ClientDialogService
  ) { }
  

  ngOnInit(): void {
    this.fetchClients();
  }

  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedClients = this.clients.slice(startIndex, endIndex);
  }

  clearSearch() {
    this.searchTerm = ''; // Clear the search term
    this.onSearchChange(); // Trigger the search change event
  }
  
  onSearchChange(event?: Event) {
    if (event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      // Your search logic here, using searchTerm
      this.displayedClients = this.clients.filter(client =>
        client.ClientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Handle the case when the "Clear Search" button is clicked
      this.searchTerm = ''; // Clear the search term
      
      // Trigger your search logic with an empty searchTerm or reset the displayedClients
    }
    
  }
  
  // onSearchChange() {
  //   const searchTerm = this.searchTerm.toLowerCase();
  //   //const searchTerm = event.target.value;
    
  // }

  
  

  onPageChange(pageNumber: number) {
    this.updateDisplayedClients(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedClients(1); // Reset to the first page when page size changes
  }

  fetchClients() {
    this.clientService.getClients().subscribe((clients: any[]) => {
      this.clients = clients;
      this.updateDisplayedClients(1); // Initialize displayedClients when data is fetched
    });
  }

  createNewClient() {
    this.isEditing = false;
    this.clientIdToEdit = null;
    this.clientName = '';
    this.showClientForm = true;

    // Open the create client popup
    this.clientDialogService.openCreateClientPopup().subscribe(newClientName => {
      if (newClientName) {
        this.clientName = newClientName;
        this.saveClient(); // Save the new client
      } else {
        this.showClientForm = false;
      }
    });
  }

  editClient(client: any) {
    this.isEditing = true;
    this.clientIdToEdit = client.id;
    this.clientName = client.name;

    // Open the edit client popup
    this.clientDialogService.openEditClientPopup(this.clientName).subscribe(updatedClientName => {
      if (updatedClientName) {
        this.clientName = updatedClientName;
        this.saveClient(); // Save the updated client
      } else {
        this.showClientForm = false;
      }
    });
  }

  saveClient() {
    if (this.isEditing && this.clientIdToEdit) {
      // Edit client
      this.clientService.updateClient(this.clientIdToEdit, { name: this.clientName }).subscribe(() => {
        this.showClientForm = false;
        this.fetchClients();
      });
    } else {
      // Create new client
      this.clientService.createClient({ name: this.clientName }).subscribe(() => {
        this.showClientForm = false;
        this.fetchClients();
      });
    }
  }

  cancelEdit() {
    this.showClientForm = false;
  }

  deleteClient(client: any) {
    this.clientService.deleteClient(client.id).subscribe(() => {
      this.clients = this.clients.filter(c => c.id !== client.id);
    });
  }

  
}
