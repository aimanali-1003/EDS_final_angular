import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './data-template-dialog.component.html',
})
export class DataTemplateDialogComponent {
  templateName: string = '';
  columns: any[] = [];
  selectedColumns: any[] = [];
  selectedCategory: number | null = null;
  categories: any[] = []; // Define the categories property
  availableColumns: string[] = ['Column1', 'Column2', 'Column3']; // Replace with actual column names
  availableCategories: string[] = ['Column1', 'Column2', 'Column3']; 


  constructor(private dataService: DataService) { }

  onSubmit() {
    // Add your form submission logic here
    console.log('Form submitted with templateName:', this.templateName);

    // Optionally, you can close the dialog here if it's supposed to close on submission
    // this.dialogRef.close(this.templateName);
  }

  ngOnInit(): void {
    // Fetch column names from your DataService
    this.dataService.getColumns().subscribe(columns => {
      this.columns = columns;
    });
  }

  toggleSelection(column: any) {
    column.checked = !column.checked;
    this.selectedColumns = this.columns.filter(c => c.checked);
  }

  isSelected(column: any): boolean {
    return column.checked;
  }
}

