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

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }
  

  openClientPopup(client?: any): void {
    const isEditing = !!client; // Check if you are editing an existing client

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: isEditing ? 'Edits Client' : 'Create New Client',
        content: isEditing ? 'Update the client details:' : 'Enter client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: isEditing ? 'Update' : 'Create', // Use different labels for create and update
        updateText: isEditing ? 'Update' : 'Create',
        isUpdate: isEditing, // Set to true for editing, false for creating
        input: isEditing ? client.ClientName : '', // Initialize with client name if editing
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEditing) {
          // Handle the update operation here
          this.updateClient(client, result);
        } else {
          // Handle the create operation here
          this.createNewClient(result);
        }
      }
    });
  }

  updateClient(client: any, updatedValue: string): void {
    // Implement your updateClient logic here
  }

  createNewClient(clientName: string): void {
    // Implement your createNewClient logic here
  }

  

  ngOnInit(): void {
    this.fetchClients();
    // this.clientService.getClients().subscribe((data: any[]) => {
    //   Format the API response data into the required array of arrays format
    //   this.displayedClients = data.map((client) => [
    //     client.ClientName,
    //     client.id,
    //     client.CreatedAt,
    //     client.CreatedBy,
    //     client.UpdatedAt,
    //     client.UpdatedBy,
    //     client.Active,
    //   ]);
    // });
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
    }
    
  }
   

  // createClient() {
  //   this.isEditing = false;
  //   this.clientIdToEdit = null;
  //   this.clientName = '';
  //   this.showClientForm = true;

  //   // Open the create client popup
  //   this.clientDialogService.openCreateClientPopup().subscribe(newClientName => {
  //     if (newClientName) {
  //       this.clientName = newClientName;
  //       this.saveClient(); // Save the new client
  //     } else {
  //       this.showClientForm = false;
  //     }
  //   });
  //   this.sharedService.createClient(); 
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

  

  editClient(client: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Edits Client',
        content: 'Update the client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: 'Update', // Use 'Update' for editing
        updateText: 'Update', // Use 'Update' for editing
        isUpdate: true, // Set to true for editing
        input: client.name, // Initialize with client name for editing
      },
    });

    dialogRef.afterClosed().subscribe((updatedClientName) => {
      if (updatedClientName) {
        // Handle the client update here (you may need to update your data structure)
        client.name = updatedClientName;
        // You can then save the updated client or perform other actions as needed.
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
 