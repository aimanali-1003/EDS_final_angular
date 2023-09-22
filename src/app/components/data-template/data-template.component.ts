import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { DataTemplate } from 'src/app/model/data-template.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-data-template',
  templateUrl: './data-template.component.html',
  styleUrls: ['./data-template.component.css']
})
export class DataTemplateComponent implements OnInit {
  dataTemplates: any[] = [];
  showForm = false; // Variable to control the form's visibility
  templateData: any = {}; // Object to store template data
  editingTemplate = false; // Flag to indicate whether we're editing a template
  template: DataTemplate = { name: '', category: '', columns: [] };
  availableColumns: string[] = ['Column1', 'Column2', 'Column3']; // Replace with actual column names
  selectedColumns: string[] = [];

  selectedCategory: string[] = []; // Replace string with the appropriate data type if needed
  availableCategories: string[] = [];

  constructor(private dataService: DataService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Fetch data templates from the service
    this.dataService.getDataTemplates().subscribe((templates: any[]) => {
      this.dataTemplates = templates;
    });



    this.httpClient.get<any[]>('https://lr7rg.wiremockapi.cloud/category').subscribe(
      (categories: any[]) => {
        // Assuming categories is an array of objects with a 'Name' property
        this.availableCategories = categories.map(category => category.Name);
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error here
      }
    );
  }

  createNewTemplate() {
    // Show the form for creating a new template
    this.showForm = true;
    this.templateData = {}; // Clear any existing template data
    this.editingTemplate = false; // Set editing flag to false
  }

  editTemplate(template: any) {
    // Show the form for editing a template
    this.showForm = true;
    this.templateData = { ...template }; // Copy template data for editing
    this.editingTemplate = true; // Set editing flag to true
  }

  saveTemplate() {
    if (this.editingTemplate) {
      // Handle editing logic here using this.templateData
      // Call the service to update the template
    } else {
      // Handle creation logic here using this.templateData
      // Call the service to create a new template
    }

    // After saving or creating, hide the form and refresh the template list
    this.showForm = false;
    this.templateData = {}; // Clear the template data
  }

  deleteTemplate(template: any) {
    // Delete the template using the data service (implement this method in the service)
    this.dataService.deleteDataTemplate(template.id).subscribe(() => {
      // Remove the template from the local list
      this.dataTemplates = this.dataTemplates.filter(t => t.id !== template.id);
    });
  }
}
