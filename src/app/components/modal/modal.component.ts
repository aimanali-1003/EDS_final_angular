import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  formData: any = {}; // Initialize an empty object for form data
  fields: any[] = []; // Initialize an empty array for form fields
  isEditing: boolean = false; // Flag to determine if it's an update or create operation

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Assign fields and data from the configuration object
    this.fields = this.data.fields || [];
    this.formData = this.data.data || {};
    this.isEditing = this.data.isEditing || false; // Set the editing flag
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Handle the save action here
    this.dialogRef.close({ data: this.formData, isEditing: this.isEditing });
  }
}
