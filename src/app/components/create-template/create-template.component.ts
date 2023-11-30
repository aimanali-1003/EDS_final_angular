import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemplateVM } from 'src/app/model/DataTemplateModel';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActiveJobsPopupComponent } from '../active-jobs-popup/active-jobs-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CategorySM } from 'src/app/model/CategoryModel';
import { ColumnsVM } from 'src/app/model/ColumnDataModel';
import { MatSelectChange } from '@angular/material/select';
import { TemplateColumnVM } from 'src/app/model/TemplateColumnDataModel';
import { CreateTemplateVM, TemplateColumnModelVM } from 'src/app/model/CreateTemplateVM';
import { transferArrayItem } from '@angular/cdk/drag-drop'; 


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
  templateData: CreateTemplateVM = new CreateTemplateVM()

  isEdit: boolean = false;
  isViewOnly: boolean = false;
  templateId!: number;

  selectedCategoryColumns: ColumnsVM[] = [];
  selectedTemplateColumns: TemplateColumnModelVM[] = [];

  selectedColumn: number = 0;
  selectedCategory: number = 0;

  selectedColumns: TemplateColumnModelVM[] = [];
  displayedColumns: ColumnsVM[] = [];
  checkedColumns: ColumnsVM[] = [];


  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.route.params.subscribe((params) => {
      this.templateId = +params['templateId'];
      this.isViewOnly = params['isViewOnly'];})

      // if (this.templateId) {
      //   this.templateService.getTemplate(this.templateId).subscribe(
      //     (response) => {
      //       if (response.code === 200 && response.data) {

      //         this.templateData = response.data;
      //         this.selectedRecipientType =this.jobData.dataRecipientTypeLkpId;
      //         this.selectedFileFormatType = this.jobData.fileFormatLkpId ;
      //         this.selectedFrequencyTypeLookups = response.data.frequencyLkpValue;

      //       } else {
      //         console.error('No client found or unsuccessful response.');
      //       }
      //     },
      //     (error) => {
      //       console.error('Error fetching client:', error);
      //     }
      //   );
      // }
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
    const selectedCategoryObj = this.categories.find(category => category.categoryId === this.selectedCategory);
  
    if (selectedCategoryObj && selectedCategoryObj.edsColumns) {
      this.selectedCategoryColumns = selectedCategoryObj.edsColumns.map(column => ({
        ...column,
        isActive: false,
      }));
      this.checkedColumns = JSON.parse(JSON.stringify(this.selectedCategoryColumns)); // Save checked columns
      this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumns)); // Deep copy for display
    } else {
      this.selectedCategoryColumns = [];
      this.checkedColumns = [];
      this.displayedColumns = [];
    }
  }
  


   drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.checkedColumns, event.previousIndex, event.currentIndex);
    console.log(`Dropped column from index ${event.previousIndex} to index ${event.currentIndex}`);

    // Update displayedColumns for drag-and-drop list after drop
    this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumns)); // Deep copy
  }
 
  getCheckedColumns(): ColumnsVM[] {
    return this.selectedCategoryColumns.filter(column => column.isActive);
  }
  
  

  deleteColumn(columnName: string) {
    const index = this.checkedColumns.findIndex(column => column.columnName === columnName);
    if (index !== -1) {
      this.checkedColumns.splice(index, 1);
      // Update displayedColumns for drag-and-drop list
      this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumns)); // Deep copy
      // Perform additional logic if needed
    }
  }
  
  


  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

createUpdateTemplate(){
  this.templateData.categoryId = this.selectedCategory;

  if (this.selectedCategoryColumns) {
    const checkedColumns = this.selectedCategoryColumns
      .filter(column => column.isActive)
      .map(column => column.columnName);
    console.log(checkedColumns)
    const columnNameToColumnIdMap: { [key: string]: number } = {};

    this.selectedCategoryColumns.forEach(column => {
      columnNameToColumnIdMap[column.columnName] = column.columnsId;
    });
    const checkedColumnIds = checkedColumns.map(columnName => columnNameToColumnIdMap[columnName]);
    console.log('Column IDs corresponding to checked columns:', checkedColumnIds);
    const templateColumns: TemplateColumnModelVM[] = checkedColumnIds.map((columnId, index) => ({
      columnId: columnId,
      serialNumber: index + 1,
    }));
    this.templateData.templateColumns = templateColumns;
  }

  if(!this.isEdit){

    this.templateService.createDataTemplate(this.templateData).subscribe(
      (response: any) => {
        this.snackBar.open('Template created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/templates']);
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
