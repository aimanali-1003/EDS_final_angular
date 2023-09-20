// generic-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent<T> {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      content: string;
      input: string; // For creating new items
      updatedValue: string; // For updating existing items
      inputPlaceholder: string;
      cancelText: string;
      createText: string; // Text for the create button
      updateText: string; // Text for the update button
      isUpdate: boolean; // Flag to indicate whether it's an update
    }
  ) {}

  closeDialog(): void {
    this.dialogRef.close(this.data.isUpdate ? this.data.updatedValue : this.data.input);
  }
}
