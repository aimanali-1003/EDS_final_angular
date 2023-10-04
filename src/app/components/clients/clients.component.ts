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

  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientDialogService : ClientDialogService,
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
          // Add more fields as needed
        ],
        isEditing: false // Explicitly set it to false for a create operation
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the created client data here
        const newData = result.data; // New data
        // Perform create logic with newData
      }
    });
  }
  CreateClients(){
    this.router.navigate(['/createClient']);
  }
  

  openClientModalForEdit(clientData?: any): void {
    if (clientData && clientData.clientID) {
      const clientId = clientData.clientID; 
      this.router.navigate(['/editClient', clientId]);
    
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Successfully Deleted', 'Cancel', {
          duration: 2000,
        });
      }
    });
  }
  

  // openClientPopup(client?: any): void {
  //   const isEditing = !!client;  

  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     data: {
  //       title: isEditing ? 'Edits Client' : 'Create New Client',
  //       content: isEditing ? 'Update the client details:' : 'Enter client details:',
  //       inputPlaceholder: 'Client Name',
  //       cancelText: 'Cancel',
  //       createText: isEditing ? 'Update' : 'Create', 
  //       updateText: isEditing ? 'Update' : 'Create',
  //       isUpdate: isEditing,  
  //       input: isEditing ? client.ClientName : '',  
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       if (isEditing) {
  //         // Handle the update operation here
  //         this.updateClient(client, result);
  //       } else {
  //         // Handle the create operation here
  //         this.createNewClient(result);
  //       }
  //     }
  //   });
  // }

  updateClient(client: any, updatedValue: string): void { 
  }

  createNewClient(clientName: string): void { 
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

  deleteClient(client: any) {
    this.clientService.deleteClient(client.id).subscribe(() => {
      this.clients = this.clients.filter(c => c.id !== client.id);
    });
  }
  fetchClients() {
    this.clientService.getClients().subscribe((clients: any[]) => {
      this.clients = clients; 
      console.log('Clients:', this.clients); // Log the clients array
      this.updateDisplayedClients(1);
    });
  }
  
  
  
  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedClients = this.clients.slice(startIndex, endIndex);
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
 