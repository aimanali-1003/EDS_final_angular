import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTemplateDialogComponent } from '../data-template-dialog/data-template-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-template',
  templateUrl: './data-template.component.html',
  styleUrls: ['./data-template.component.css'],
})
export class DataTemplateComponent implements OnInit {
  dataTemplates: any[] = [];
  category: string[] = [];
  showForm = false; 
  editingTemplate = false;
  template: any = { templateName: '', category: '', columns: {} }; 
  selectedColumns: string[] = [];
  displayedTemplate: any[] = [];

  currentPage: number = 1;

  pageSize: number = 10;
  searchTerm: string = ''; 


  selectedCategory: string[] = [];
  availableCategories: string[] = [];

  isDialogOpen = false;

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
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
 
  editTemplate(template: any) {
    this.router.navigate(['/editTemplate/' + template.templateID]);
  }

  deleteTemplate(template: any): void {
    const templateId = template;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this Template?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dataService.deleteDataTemplate(templateId).subscribe(() => {
          this.dataTemplates = this.dataTemplates.filter((t) => t.templateID !== templateId);
          this.snackBar.open('Template successfully deleted', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  } 
  createNewTemplate() {
    this.router.navigate(['/createTemplate']);
  } 
  
  performClientSearch(query: string) { 
  } 

  applyClientFilter(filterData: any) { 
  }
  
  private updatedataTemplates(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataTemplates = this.dataTemplates
      .slice(0)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice(startIndex, endIndex);
  }
 
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedTemplates(this.currentPage);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedTemplates(this.currentPage);
  }

  private updateDisplayedTemplates(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.dataTemplates.length);
    this.displayedTemplate = this.dataTemplates.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.dataService.getDataTemplates().subscribe((dataTemplate: any[]) => {
      this.dataTemplates = dataTemplate;
      this.updateDisplayedTemplates(this.currentPage);
    });
  }
   
}
