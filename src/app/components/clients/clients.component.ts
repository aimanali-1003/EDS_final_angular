import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientVM } from 'src/app/model/ClientModel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild('paginatorRef') paginator!: MatPaginator;

  clients: any[] = [];
  displayedClients: ClientVM[] = [];
  pageSize: number = 10; 
  isViewingClient: boolean = false;
  clientData: any;
  clientSearchQuery: string = '';
  clientss: ClientVM[] = [];
  pageNumber: number = 1;
  totalClients = 0; 
  clientId!: number;
  client!: ClientVM;

  constructor(
    private clientService: ClientService,
    private router: Router, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  
  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getClients({ pageSize: this.pageSize, pageNumber: this.pageNumber }).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.clientss = response.itemList;
          this.totalClients = +response.totalCount;
          this.updateDisplayedClients(this.pageNumber);
        }
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedClients = this.clientss.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchClients();
  }

  viewClient(clientId: number): void {
    this.clientService.getClientById(clientId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const client: ClientVM = response.data;
          this.router.navigate(['/viewClient/'+clientId+'/'+true]);
        } else {
          console.error('No client found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  CreateClients() {
    this.router.navigate(['/createClient']);
  }

  openClientModalForEdit(clientId: number): void {
    if (clientId) {;
      this.router.navigate(['/editClient', clientId]);
    }
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
}
 