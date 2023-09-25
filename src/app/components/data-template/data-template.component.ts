import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTemplateDialogComponent } from '../data-template-dialog/data-template-dialog.component'; 
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { DataTemplate } from 'src/app/model/data-template.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-template',
  templateUrl: './data-template.component.html',
  styleUrls: ['./data-template.component.css'],
})
export class DataTemplateComponent implements OnInit {
  dataTemplates: any[] = [];
  category: string[] = [];
  showForm = false;
  templateData: any = {};
  editingTemplate = false;
  template: DataTemplate = { name: '', category: '', columns: [] };
  availableColumns: string[] = ['Column1', 'Column2', 'Column3'];
  selectedColumns: string[] = [];
  displayedCategory: any[] = []; 


  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedClient: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];


  selectedCategory: string[] = [];
  availableCategories: string[] = [];

  isDialogOpen = false;

  private updateDisplayedCategory(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategory = this.category.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedCategory(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedCategory(1); // Reset to the first page when page size changes
  }

  fetchClients() {
    this.dataService.getDataTemplates().subscribe((category: any[]) => {
      this.category = category;
      this.updateDisplayedCategory(1); // Initialize displayedClients when data is fetched
    });
  }
  openCreateTemplateModal() {
    const dialogRef = this.dialog.open(DataTemplateDialogComponent, {
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
  constructor(
    private dataService: DataService,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog // Inject MatDialog for opening the dialog
  ) {}

  ngOnInit(): void {
    this.dataService.getDataTemplates().subscribe((templates: any[]) => {
      this.dataTemplates = templates;
    });
  } 

  editTemplate(template: any) {
    this.showForm = true;
    this.templateData = { ...template };
    this.editingTemplate = true;
  }

  saveTemplate() {
    if (this.editingTemplate) {
      // Implement the logic for editing a template
    } else {
      // Implement the logic for creating a template
    }
    this.showForm = false;
    this.templateData = {};
  }

  deleteTemplate(template: any) {
    this.dataService.deleteDataTemplate(template.id).subscribe(() => {
      this.dataTemplates = this.dataTemplates.filter((t) => t.id !== template.id);
    });
  }
 

  createNewTemplate() {
    this.router.navigate(['/createTemplate']);
  }

  // Existing methods...

  cancelCreateTemplate(): void {
    this.showForm = false;
    this.templateData = {};
  }
  // Open the create template dialog
openCreateTemplateDialog(): void {
  // Prevent opening multiple dialogs
  if (!this.isDialogOpen) {
    const dialogRef = this.dialog.open(DataTemplateDialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { template: this.template }, // Pass data to the dialog if needed
      disableClose: true, // Prevent closing by clicking outside
      autoFocus: false, // Prevent autofocus on input fields
    });

    this.isDialogOpen = true;

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
      // Handle dialog close event here, if needed
    });
  }
}

}
