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
  template: any = { templateName: '', category: '', columns: {} };

  availableColumns: string[] = ['Column1', 'Column2', 'Column3'];
  selectedColumns: string[] = [];
  displayedCategory: any[] = []; 


  pageSize: number = 10;  
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
    this.updateDisplayedCategory(1);  
  }

  fetchClients() {
    this.dataService.getDataTemplates().subscribe((category: any[]) => {
      this.category = category;
      this.updateDisplayedCategory(1);  
    });
  }
  openCreateTemplateModal() {
    const dialogRef = this.dialog.open(DataTemplateDialogComponent, {
      width: '400px',  
    });

    dialogRef.afterClosed().subscribe(result => { 
    });
  }
  constructor(
    private dataService: DataService,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog  
  ) {}

  ngOnInit(): void {
    this.dataService.getDataTemplates().subscribe((templates: any[]) => {
      this.dataTemplates = templates;
      console.log(this.dataTemplates);
    });
  } 

  editTemplate(template: any) {
    this.router.navigate(['/editTemplate']);
  }

  saveTemplate() {
    if (this.editingTemplate) { 
    } else { 
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
 

  cancelCreateTemplate(): void {
    this.showForm = false;
    this.templateData = {};
  }

  performClientSearch(query: string) {
    // Implement the search logic specific to the 'clients' component
    // Update your displayedCategory based on the query
  }
  
  applyClientFilter(filterData: any) {
    // Implement the filter logic specific to the 'clients' component
    // Update your displayedCategory based on the filter data
  } 
openCreateTemplateDialog(): void { 
  if (!this.isDialogOpen) {
    const dialogRef = this.dialog.open(DataTemplateDialogComponent, {
      width: '400px',  
      data: { template: this.template }, 
      disableClose: true, 
      autoFocus: false, 
    });

    this.isDialogOpen = true;

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false; 
    });
  }
}

}
