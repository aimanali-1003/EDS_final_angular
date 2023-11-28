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
  // currentPage: number = 1;
  templateSearchQuery: string = '';
  pageSize: number = 10;
  searchTerm: string = '';
  templates: TemplateVM[] = [];
  currentPage: number = 1; // Track current page
  totalClients = 0; 


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
  

  // viewTemplate(dataTemplates?: any): void {
  //   const templateId = dataTemplates.templateID;
  //   this.router.navigate(['/viewTemplate/' + templateId + '/' + true]);
  // }
  viewTemplate(templateId: number): void {
    this.dataService.getTemplate(templateId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const template: TemplateVM = response.data;
          this.router.navigate(['/viewTemplate/'+templateId+'/'+true]);  // Routing to create-client component with client ID
        } else {
          console.error('No client found or unsuccessful response.');
          // Handle error cases or no client found
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
        // Handle error cases
      }
    );
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

  fetchTemplates(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
      // Add other parameters as required by your API
    };
  
    this.dataService.getDataTemplates(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.templates = this.templates.concat(response.itemList);
          this.totalClients = +response.totalCount; // Convert totalCount to a number
        }
        // Handle if itemList doesn't exist or other scenarios
      },
      (error) => {
        console.error('Error fetching templates:', error);
        // Handle error cases
      }
    );
  }
  
  ngOnInit(): void { 
    this.fetchTemplates(); 
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
      return true; // If no filter is selected, return all clients
    });
  }
  
}
