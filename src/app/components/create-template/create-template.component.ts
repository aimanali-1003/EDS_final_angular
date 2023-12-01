import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemplateVM } from 'src/app/model/DataTemplateModel';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActiveJobsPopupComponent } from '../active-jobs-popup/active-jobs-popup.component'; 
import { CategoryService } from 'src/app/services/category.service';
import { CategorySM } from 'src/app/model/CategoryModel';
import { ColumnsVM } from 'src/app/model/ColumnDataModel'; 
import { CreateTemplateVM, TemplateColumnModelVM } from 'src/app/model/CreateTemplateVM'; 
import { TemplateColumnVM } from 'src/app/model/TemplateColumnDataModel';


@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  currentPage: number = 1;
  totalCategories = 0;
  pageSize: number = 10;
  categories: CategorySM[] = [];

  templates: TemplateVM[] = [];
  templateData: TemplateVM = new TemplateVM()

  isEdit: boolean = false;
  isViewOnly: boolean = false;
  templateId!: number;

  selectedCategoryColumns: ColumnsVM[] = [];
  selectedTemplateColumns: TemplateColumnModelVM[] = [];

  select:ColumnsVM[]=[];

  selectedColumn: number = 0;
  selectedCategory: number = 0;

  selectedColumns: ColumnsVM[] = [];
  displayedColumns: ColumnsVM[] = [];
  checkedColumnsArray: any[] = [];

  templateDataa:TemplateVM[]=[];



  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.route.params.subscribe((params) => {
      this.templateId = +params['id'];
      this.isViewOnly = params['isViewOnly'];
      if (this.templateId) {
        this.isEdit = true;
        console.log(" template ID"   ,this.templateId)
        this.templateService.getTemplate(this.templateId).subscribe(
          (response) => {
            if (response.code === 200 && response.data && response.data.edsTemplateColumns) { 
              this.templateData=response.data;
              // c=response.data.edsTemplateColumns;
              this.select = response.data.edsTemplateColumns.map((item: any) => item.columns.columnName);
        
              console.log("Column Names: ", this.select);
            } else {
              console.error('No template found or unsuccessful response.');
            }
          },
          (error) => {
            console.error('Error fetching template:', error);
          }
        );
        
        
      }
    
    
    }) 

      
  }

  fetchCategories(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };
  
    this.categoryService.getCategories(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.categories = this.categories.concat(response.itemList);
          this.totalCategories = +response.totalCount;
        }
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  

  onCategorySelectionChange(): void {
    const selectedCategoryObj = this.categories.find(
      (category) => category.categoryId === this.selectedCategory
    );
  
    if (selectedCategoryObj && selectedCategoryObj.edsColumns) {
      this.selectedCategoryColumns = selectedCategoryObj.edsColumns.map((column) => ({
        ...column,
        isActive: false,
      })); 
    }
  }
  

  onCheckboxChange(column: ColumnsVM) {
    if (column.isActive) {
      console.log(`Selected column: ${column.columnName}`); 
      if (!this.checkedColumnsArray.find(col => col.columnsId === column.columnsId)) {
        this.checkedColumnsArray.push(column);
      }
    } else {
      console.log(`Deselected column: ${column.columnName}`); 
      const index = this.checkedColumnsArray.findIndex(col => col.columnsId === column.columnsId);
      if (index !== -1) {
        this.checkedColumnsArray.splice(index, 1);
      }
    }
    console.log('Checked Columns Array:', this.checkedColumnsArray);  
  }

  getCheckedColumnsForDragDrop(): ColumnsVM[] {
    return this.checkedColumnsArray;
  } 

   drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.checkedColumnsArray, event.previousIndex, event.currentIndex);
    console.log(`Dropped column from index ${event.previousIndex} to index ${event.currentIndex}`);
 
    this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumnsArray));  
  }
 
  getCheckedColumns(): ColumnsVM[] {
    return this.selectedCategoryColumns.filter(column => column.isActive);
  }
  
  

  deleteColumn(columnName: string) {
    const index = this.checkedColumnsArray.findIndex(column => column.columnName === columnName);
    if (index !== -1) {
      this.checkedColumnsArray.splice(index, 1); 
      const selectedCategoryColumnIndex = this.selectedCategoryColumns.findIndex(column => column.columnName === columnName);
      if (selectedCategoryColumnIndex !== -1) {
        this.selectedCategoryColumns[selectedCategoryColumnIndex].isActive = false;
      } 
      this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumnsArray));  
    }
  } 


  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  createUpdateTemplate() {
    this.templateData.categoryId = this.selectedCategory;
  
    if (this.checkedColumnsArray.length > 0) {
      // Get the IDs of checked columns in the dropped order
      const checkedColumnIds = this.checkedColumnsArray.map(column => column.columnsId);
  
      // Update the serial numbers based on the dropped order
      const updatedTemplateColumns: TemplateColumnModelVM[] = checkedColumnIds.map((columnId, index) => ({
        columnId: columnId,
        serialNumber: index + 1,
      }));
  
      // Assign the updated columns to the templateData
      this.templateData.templateColumns = updatedTemplateColumns; 
      this.templateData.edsTemplateColumns = this.checkedColumnsArray;
      console.log("complete template object before creating",this.templateData)
    }
  
    if (!this.isEdit) {
      // Make your API call here to create the template
      this.templateService.createDataTemplate(this.templateData).subscribe(
        (response: any) => {
          this.snackBar.open('Template created successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/dataTemplate']);
        },
        (error: any) => {
          this.snackBar.open('Error creating template: ' + error, 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
  
}
