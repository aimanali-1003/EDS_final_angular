import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ClientDialogService } from 'src/app/services/client-dialog.service'; 
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
  pageSize: number = 10; 
  isViewingClient: boolean = false;
  clientData: any;
  clientSearchQuery: string = ''; 

  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientDialogService: ClientDialogService, 
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
  
  viewClient(clientData?: any): void {
    const clientId = clientData.clientID;
    this.router.navigate(['/viewClient/'+clientId+'/'+true]);    
  }

  deleteClient(client: any): void {
    const clientId = client.clientID;
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
        this.clientService.deleteClient(clientId).subscribe(() => {
          this.clients = this.clients.filter(c => c.clientID !== clientId);
          this.updateDisplayedClients(1);
          this.snackBar.open('Client successfully deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
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
    this.displayedClients = this.clients
      .slice(0)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
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
    this.displayedClients = this.filterClients(this.clients, query);
  }
  
  filterClients(clients: any[], query: string): any[] {
    return clients.filter(client =>
      client.clientName.toLowerCase().includes(query.toLowerCase()) ||
      client.clientCode.toLowerCase().includes(query.toLowerCase()) ||
      (client.Active ? 'Active' : 'Inactive').toLowerCase().includes(query.toLowerCase())
    );
  }

  applyClientFilter(filterData: any) {
    this.displayedClients = this.clients.filter((client) => {
      return true; 
    });
  } 
}
 