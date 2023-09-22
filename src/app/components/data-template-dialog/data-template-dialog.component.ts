import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './data-template-dialog.component.html',
})
export class DataTemplateDialogComponent {
  constructor(public dialogRef: MatDialogRef<DataTemplateDialogComponent>) {}

  // Define methods and properties for your dialog here

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog when "Cancel" is clicked
  }

  onSaveClick(): void {
    // Handle save logic here if needed
    this.dialogRef.close();
  }
}

