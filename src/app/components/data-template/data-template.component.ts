import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { TemplateVM } from 'src/app/model/DataTemplateModel';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-template',
  templateUrl: './data-template.component.html',
  styleUrls: ['./data-template.component.css'],
})
export class DataTemplateComponent implements OnInit {
  @ViewChild('paginatorRef') paginator!: MatPaginator;

  dataTemplates: any[] = [];
  showForm = false;
  editingTemplate = false;
  template: any[]=[];
  selectedColumns: string[] = [];
  displayedTemplate: TemplateVM[] = [];
  categories: any[] = [];
  templateSearchQuery: string = '';
  pageSize: number = 10;
  searchTerm: string = '';
  templates: TemplateVM[] = [];
  pageNumber: number = 1;
  totalTemplates = 0; 


  selectedCategory: string[] = [];
  availableCategories: string[] = [];

  isDialogOpen = false;


  constructor(
    private dataService: DataService,
    private categoryService: CategoryService,
    private router: Router,
    private route:ActivatedRoute,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  createNewTemplate() {
    this.router.navigate(['/createTemplate']);
  }  

  viewTemplate(templateId: number): void {
    this.dataService.getTemplate(templateId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const template: TemplateVM = response.data;
          this.router.navigate(['/viewTemplate/'+templateId+'/'+true]);
        } else {
          console.error('No client found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  editTemplate(templateId: number) {
    this.router.navigate(['/editTemplate/' + templateId]);
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
          // this.updateDisplayedTemplates();
          this.snackBar.open('Template successfully deleted', 'Close', {
            duration: 2000,
          });
        }); 
      }
    });
  } 

  fetchTemplates(): void {

    this.dataService.getDataTemplates({ pageSize: this.pageSize, pageNumber: this.pageNumber }).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.templates = response.itemList;
          this.totalTemplates = +response.totalCount;
          this.updateDisplayedTemplates(this.pageNumber);
        }
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }

  
  updateDisplayedTemplates(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTemplate = this.templates.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchTemplates();
  }
  
  ngOnInit(): void { 
    this.fetchTemplates(); 
  }

  getMatchingCategoryInfo(template: any): { categoryCode: string, categoryName: string } {
    const matchingCategory = this.categories.find(category => category.categoryID === template.categoryID);
    return matchingCategory
      ? { categoryCode: matchingCategory.categoryCode, categoryName: matchingCategory.categoryName }
      : { categoryCode: '', categoryName: '' };
  }
  performTemplateSearch(searchTerm: string) {
    this.templateSearchQuery = searchTerm;
    this.displayedTemplate = this.dataTemplates.filter(template =>
      template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.active.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  applyTemplateFilter(filterData: any) {
    this.displayedTemplate = this.dataTemplates.filter((template) => {
      if (filterData.active !== undefined) {
        return template.active === filterData.active;
      }
      return true;
    });
  }
  
}
