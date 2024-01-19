import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-client-info-popup',
  templateUrl: './client-info-popup.component.html',
  styleUrls: ['./client-info-popup.component.css']
})
export class ClientInfoPopupComponent implements OnInit {
  clientData: any;

  constructor(
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: { client: any },
    public dialogRef: MatDialogRef<ClientInfoPopupComponent> // Inject MatDialogRef
  ) {
    this.clientData = data.client;
    this.clientService.getClientById(this.clientData.clientId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          this.clientData = response.data;
 
          console.log("Client fetched from DB", this.clientData)
        } else {
          console.error('No client found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(); // Implement closeDialog method
  }
}
