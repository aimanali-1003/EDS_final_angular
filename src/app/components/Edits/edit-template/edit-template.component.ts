import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent  {

  templateName: string = '';
  selectedCategories: string[] = [];
  selectedOrganization: string = '';
  selectedClient: string = '';
  selectedColumns: { [key: string]: any } = {};
  columnSearch: string = '';
  filteredColumns: string[] = [];

  // Sample data for categories, organizations, and clients
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  organizations: string[] = ['Org 1', 'Org 2', 'Org 3'];
  clients: string[] = ['Client 1', 'Client 2', 'Client 3'];
  columns: string[] = [
    'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7',
    'Column 8', 'Column 9', 'Column 10', 'Column 11', 'Column 12', 'Column 13', 'Column 14',
    'Column 15', 'Column 16', 'Column 17', 'Column 18'
  ];

  constructor(private router: Router,
    private snackBar: MatSnackBar  ) {}

  updateFilteredColumns() {
    const searchText = this.columnSearch.toLowerCase();
    this.filteredColumns = this.columns.filter(column => column.toLowerCase().includes(searchText));
  }

  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  SaveTemplate() {
    const selectedColumnsArray = Object.keys(this.selectedColumns).filter(column => this.selectedColumns[column]);
    console.log('Selected Columns:', selectedColumnsArray); 

    
    this.snackBar.open('Template Edited successfully', 'Close', {
      duration: 3000, 
    }); 
    this.goToTemplateScreen(); 
  } 
 
 

}
