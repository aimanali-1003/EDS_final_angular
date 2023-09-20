import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-popup',
  templateUrl: './client-popup.component.html',
  styleUrls: ['./client-popup.component.css'],
})
export class ClientPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ClientPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close(this.data.input);
  }
}
