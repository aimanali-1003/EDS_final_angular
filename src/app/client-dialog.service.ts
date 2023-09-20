import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClientPopupComponent } from './client-popup/client-popup.component';

@Injectable({
  providedIn: 'root',
})
export class ClientDialogService {
  constructor(private dialog: MatDialog) {}

  openEditClientPopup(clientName: string): Observable<string | undefined> {
    const dialogRef = this.dialog.open(ClientPopupComponent, {
      width: '400px', // Adjust the width as needed
      data: { title: 'Edit Client', content: 'Client Name:', input: clientName },
    });

    return dialogRef.afterClosed();
  }

  openCreateClientPopup(): Observable<string | undefined> {
    const dialogRef = this.dialog.open(ClientPopupComponent, {
      width: '400px', // Adjust the width as needed
      data: { title: 'Create New Client', content: 'Client Name:', input: '' },
    });

    return dialogRef.afterClosed();
  }
}
