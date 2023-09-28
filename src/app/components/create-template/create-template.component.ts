import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
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

  constructor(private router: Router) {}

  updateFilteredColumns() {
    const searchText = this.columnSearch.toLowerCase();
    this.filteredColumns = this.columns.filter(column => column.toLowerCase().includes(searchText));
  }

  goToNextComponent() {
    this.router.navigate(['/createJob']);
  }

  SaveTemplate() {
    const selectedColumnsArray = Object.keys(this.selectedColumns).filter(column => this.selectedColumns[column]);
    console.log('Selected Columns:', selectedColumnsArray);
    // Your logic to save the template
  }
}
