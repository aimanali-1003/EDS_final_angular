import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ClientDialogService } from 'src/app/services/client-dialog.service';
import { SharedService } from 'src/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  displayedClients: any[] = [];
  pageSize: number = 10; // Adjust as needed

  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientDialogService: ClientDialogService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

 
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

  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Apply sorting to the displayedClients array
    this.displayedClients = this.clients
      .slice(0) // Create a shallow copy of the clients array
      .sort((a, b) => b.clientID - a.clientID)
      .slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedClients(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedClients(1);  
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
 