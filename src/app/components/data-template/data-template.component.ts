import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-data-template',
  templateUrl: './data-template.component.html',
  styleUrls: ['./data-template.component.css'],
})
export class DataTemplateComponent implements OnInit {
  dataTemplates: any[] = [];
  showForm = false;
  editingTemplate = false;
  template: any[]=[];
  selectedColumns: string[] = [];
  displayedTemplate: any[] = [];
  categories: any[] = [];
  currentPage: number = 1;
  templateSearchQuery: string = '';
  pageSize: number = 10;
  searchTerm: string = '';


  selectedCategory: string[] = [];
  availableCategories: string[] = [];

  isDialogOpen = false;


  constructor(
    private dataService: DataService,
    private categoryService: CategoryService,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  viewTemplate(dataTemplates?: any): void {
    const templateId = dataTemplates.templateID;
    this.router.navigate(['/viewTemplate/' + templateId + '/' + true]);
  }

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
          this.updateDisplayedTemplates();
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

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedTemplates();
  }
  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedTemplates();
  }

  private updateDisplayedTemplates() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.dataTemplates.length);
    this.displayedTemplate = this.dataTemplates.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.dataService.getDataTemplates().subscribe((dataTemplate: any[]) => {
      this.dataTemplates = dataTemplate;
      this.updateDisplayedTemplates();
    });
    this.categoryService.getCategory().subscribe((categories: any[]) => {
      this.categories = categories; 
    }); 
  } 
  getMatchingCategoryInfo(template: any): { categoryCode: string, categoryName: string } {
    const matchingCategory = this.categories.find(category => category.categoryID === template.categoryID);
    return matchingCategory
      ? { categoryCode: matchingCategory.categoryCode, categoryName: matchingCategory.categoryName }
      : { categoryCode: '', categoryName: '' };
  }
  performTemplateSearch(searchTerm: string) {
    this.templateSearchQuery = searchTerm;
    this.dataService.getDataTemplates().subscribe((dataTemplate: any[]) => {
      this.dataTemplates = dataTemplate.filter(template =>
        template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.active.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.updateDisplayedTemplates();
    });
  } 
}
