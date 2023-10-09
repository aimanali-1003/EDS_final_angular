import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ClientDialogService } from 'src/app/services/client-dialog.service';
import { SharedService } from 'src/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { CLIENT } from '../constants/table-headers.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  showClientForm: boolean = false;
  clients: any[] = [];
  displayedClients: any[] = [];
  isEditing = false;
  clientIdToEdit: string | null = null;
  clientName: string = '';
  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedClient: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];
  headers = CLIENT;
  sortBy: string = 'clientName'; // Default sorting column
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction

  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientDialogService: ClientDialogService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  openClientModalForCreate(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Create Client',
        fields: [
          { label: 'Client Name', key: 'clientName', required: true },
          { label: 'Client ID', key: 'clientId', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false }, 
        ],
        isEditing: false  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        const newData = result.data;  
      }
    });
  }
  
  CreateClients() {
    this.router.navigate(['/createClient']);
  }

  openClientModalForEdit(clientData?: any): void {
    if (clientData && clientData.clientID) {
      const clientId = clientData.clientID;
      this.router.navigate(['/editClient', clientId]);
    }
  }

  deleteClient(client: any): void {
    const clientId = client.clientID; // Assuming 'clientID' is the correct property name for the client's ID
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this client?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Call the clientService to delete the client by ID
        this.clientService.deleteClient(clientId).subscribe(() => {
          // Remove the deleted client from the local 'clients' array
          this.clients = this.clients.filter(c => c.clientID !== clientId);
          console.log(clientId);
          this.updateDisplayedClients(1); // Update the displayed clients
          this.snackBar.open('Client successfully deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
          // Handle error if the delete operation fails
          console.error('Error deleting client:', error);
          this.snackBar.open('Error deleting client', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }
  

  sortByColumn(column: string): void {
    if (column === this.sortBy) {
      this.toggleSortDirection(); // Toggle sorting direction if clicking the same column
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc'; // Reset sorting direction when changing columns
    }
    this.updateDisplayedClients(1); // Apply sorting to the updated column
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateDisplayedClients(1); // Reapply sorting when direction changes
  }

  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Apply sorting to the displayedClients array
    this.displayedClients = this.clients
      .slice(0) // Create a shallow copy of the clients array
      .sort((a, b) => {
        const columnA = a[this.sortBy];
        const columnB = b[this.sortBy];

        if (this.sortDirection === 'asc') {
          return columnA.localeCompare(columnB);
        } else {
          return columnB.localeCompare(columnA);
        }
      })
      .slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.fetchClients();
  }
 
  clearSearch() {
    this.searchTerm = '';  
    this.onSearchChange();  
  }
  
  onSearchChange(event?: Event) {
    if (event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase(); 
      this.displayedClients = this.clients.filter(client =>
        client.ClientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {   
      this.searchTerm = '';  
    }
    
  } 

  onPageChange(pageNumber: number) {
    this.updateDisplayedClients(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedClients(1);  
  }
 
   

  editClient(client: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Edits Client',
        content: 'Update the client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: 'Update',  
        updateText: 'Update',  
        isUpdate: true,  
        input: client.name,  
      },
    });

    dialogRef.afterClosed().subscribe((updatedClientName) => {
      if (updatedClientName) { 
        client.name = updatedClientName; 
      }
    });
  }

  saveClient() {
    if (this.isEditing && this.clientIdToEdit) { 
      this.clientService.updateClient(this.clientIdToEdit, { name: this.clientName }).subscribe(() => {
        this.showClientForm = false;
        this.fetchClients();
      });
    } else { 
      this.clientService.createClient({ name: this.clientName }).subscribe(() => {
        this.showClientForm = false;
        this.fetchClients();
      });
    }
  }

  cancelEdit() {
    this.showClientForm = false;
  } 
  fetchClients() {
    this.clientService.getClients().subscribe((clients: any[]) => {
      this.clients = clients;  
      this.updateDisplayedClients(1);
    });
  }
  
  
   

  performClientSearch(query: string) {
    // Implement the search logic specific to the 'clients' component
    // Update your displayedCategory based on the query
  }
  
  applyClientFilter(filterData: any) {
    // Implement the filter logic specific to the 'clients' component
    // Update your displayedCategory based on the filter data
  }
  
  
}
 