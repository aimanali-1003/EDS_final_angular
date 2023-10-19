import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTemplateModel } from 'src/app/model/DataTemplateModel';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  template: DataTemplateModel = new DataTemplateModel();
  columnSearch: string = '';
  filteredColumns: string[] = [];
  categoryName: string = '';
  categoriesWithColumns: any[] = []; 
  categories: any[] = [];
  columns: any[] = [];
  isEdit:boolean = false;
  isViewOnly:boolean = false;
  templateId:string='';

  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.templateService.getCategories().subscribe((categories: any[]) => { 
      this.categories = categories;
    });


    this.route.params.subscribe((params) => {
      this.templateId = params['id'];
      this.isViewOnly = params['isViewOnly'];

      if(this.templateId != undefined && this.templateId != "" && this.templateId != null && this.templateId != ''){
        this.isEdit = true;
        this.loadTemplates(); 
      }
    });
  }

  loadTemplates(){
    this.templateService.getTemplate(this.templateId).subscribe((template: any) => { 
      this.template = template; 
    });
  }

  updateColumns(categoryId: number) {
    this.columns = [];
    this.template.categoryID = categoryId;  
    this.templateService.getColumnsByCategory(this.template.categoryID).subscribe((columns: string[]) => { 
      this.columns = columns;
      console.log(columns);
    });
  }

  updateFilteredColumns() {
    const searchText = this.columnSearch.toLowerCase();
    this.filteredColumns = this.columns.filter(column => column.toLowerCase().includes(searchText));
  }

  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }


  createTemplate() {
    const selectedColumnIds = Object.keys(this.template.columnNames)
      .filter((columnName: string) => this.template.columnNames[columnName as keyof typeof this.template.columnNames])
      .map((columnName: string) => {
        const foundColumn = this.columns.find((c: any) => c.columnName === columnName);
        return foundColumn ? foundColumn.columnID : null;
      })
      .filter((columnId: any) => columnId !== null);
  
    if (!this.template.templateName || this.template.categoryID === 0 || selectedColumnIds.length === 0) {
      this.snackBar.open('Template Name, Category, and Columns are required.', 'Close', {
        duration: 3000,
      });
      return;
    }
  
    this.templateService.createDataTemplate(this.template).subscribe(() => {});
  
    // this.templateService.getLastCreatedTemplateId().subscribe(
    //   (lastTemplateId) => {
    //     console.log('Last created template ID:', lastTemplateId);
    //     // Here you can use lastTemplateId as needed
    //   },
    //   (error) => {
    //     console.error('An error occurred:', error);
    //   }
    // );
  
    // Pass selectedColumnIds to createTemplateColumns method instead of this.template
    // this.templateService.createTemplateColumns(selectedColumnIds).subscribe(() => {
    //   this.snackBar.open('Template created successfully', 'Close', {
    //     duration: 3000,
    //   });
    // });
    this.router.navigate(['/dataTemplate']);
  }
  
  
}
