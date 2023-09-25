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
  selectedColumns: string[] = [];
  startDate!: Date;
  endDate!: Date;



  // Sample data for categories, organizations, and clients
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  organizations: string[] = ['Org 1', 'Org 2', 'Org 3']; // Add your organization data
  clients: string[] = ['Client 1', 'Client 2', 'Client 3']; // Add your client data
  columns: string[] = ['Column 1', 'Column 2', 'Column 3']; // Add your column data

  constructor(private router: Router) {}

  goToNextComponent() {
    // Assuming you have configured a route for the "Job" component in your app-routing.module.ts
    this.router.navigate(['/createJob']);
  }
}

