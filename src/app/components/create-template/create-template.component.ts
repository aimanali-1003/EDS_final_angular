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
import { MatDialog } from '@angular/material/dialog';


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

  select: ColumnsVM[] = [];

  selectedColumn: number = 0;
  selectedCategory: number = 0;

  selectedColumns: ColumnsVM[] = [];
  displayedColumns: ColumnsVM[] = [];
  checkedColumnsArray: any[] = [];

  templateDataa: TemplateVM[] = [];

  selectedTemplateId: number = 0;
  // Add a variable to store columns for drag and drop in edit mode
  editModeCheckedColumns: any[] = [];
  setDisable: boolean = false;;




  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.route.params.subscribe((params) => {
      this.templateId = +params['id'];
      this.isViewOnly = params['isViewOnly'];
      if (this.templateId) {
        this.isEdit = !this.isViewOnly; // Set isEdit based on isViewOnly
        this.selectedTemplateId = this.templateId;
        this.getTemplateData(this.templateId);
      }
    });
  }
  getColumnsInCorrectOrder(): TemplateColumnVM[] {
    if (this.templateData?.edsTemplateColumns?.length > 0) {
      return this.templateData.edsTemplateColumns.sort((a, b) => a.serialNumber - b.serialNumber);
    }
    return [];
  }


  getTemplateData(templateId: number): void {
    this.templateService.getTemplate(templateId).subscribe(
      (response) => {
        if (response.code === 200 && response.data && response.data.edsTemplateColumns) {
          this.templateData = response.data;

          console.log("response.data.edsTemplateColumns", response.data.edsTemplateColumns)

          if (this.isEdit) {
            this.fetchCategoryColumnsAndMarkSelected();
            this.showCategory({ value: this.templateData.category?.categoryId });
            this.selectedCategory = this.templateData.categoryId;
           
            this.editModeCheckedColumns = this.templateData.edsTemplateColumns
              .filter(column => column.isActive)
              .map(column => ({
                ...column,
                columnName: column.columns?.columnName || '',  
                serialNumber: column.serialNumber  
              }));
           
            this.editModeCheckedColumns.sort((a, b) => a.serialNumber - b.serialNumber);
          }
          
          
        } else {
          console.error('No template found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }



  toggleActiveStatus(): void {
    if (this.templateData && this.templateData.templateId) {
      this.templateService.getJobs(this.templateData.templateId).subscribe(
        (response: any) => {
          console.log("Data is", response);
          if (response.itemList.length > 0) {
            this.setDisable = true
            const dialogRef = this.dialog.open(ActiveJobsPopupComponent, {
              data: { activeJobs: response.itemList }
            });

            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed'); 
            });
          } else {
            console.error('No itemList found in response data.');
          }
        },
        (error: any) => {
          console.error('Error fetching jobs:', error); 
        }
      );
    }
  }

  showCategory(event: any): void {
    const selectedCategoryId = event.value;

    if (selectedCategoryId) {
      const selectedCategoryObj = this.categories.find(category => category.categoryId === selectedCategoryId);
      if (selectedCategoryObj && selectedCategoryObj.edsColumns) { 
        this.selectedCategoryColumns = selectedCategoryObj.edsColumns.map((column) => ({
          ...column,
          isActive: false,
        }));
      } else {
        this.selectedCategoryColumns = [];  
      }
    }
  }


  fetchCategoryColumnsAndMarkSelected(): void {
    const selectedCategoryId = this.templateData.category?.categoryId;
    if (selectedCategoryId) {
      this.categoryService.getCategoryById(selectedCategoryId).subscribe(
        (response) => {
          if (response.code === 200 && response.data) {
            const categoryData = response.data;

            if (categoryData.edsColumns && Array.isArray(categoryData.edsColumns)) {
              this.selectedCategoryColumns = categoryData.edsColumns.map((column: any) => {
                const isColumnSelected = this.templateData.edsTemplateColumns.some(
                  (templateColumn) => templateColumn.columnsId === column.columnsId
                );
                return {
                  ...column,
                  isActive: isColumnSelected,
                };
              });
            } else {
              console.error('Error: edsColumns is not present or is not an array');
            }
          }
        },
        (error) => {
          console.error('Error fetching category columns:', error);
        }
      );
    }
  }


  getColumnBySerialNumber(serialNumber: number): string | undefined {
    const foundColumn = this.templateData?.edsTemplateColumns.find(column => column.serialNumber === serialNumber);
    return foundColumn?.columns?.columnName;
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


  onCategorySelectionChange(event: any): void {

    const selectedCategoryId = event.value;

    // Update the selected category in the component
    this.selectedCategory = selectedCategoryId;

    if (this.isEdit) {
      this.selectedCategoryColumns = [];
      this.editModeCheckedColumns = [];
    }
 
    const selectedCategoryObj = this.categories.find(category => category.categoryId === selectedCategoryId);
    if (selectedCategoryObj && selectedCategoryObj.edsColumns) {
      this.selectedCategoryColumns = selectedCategoryObj.edsColumns.map((column) => ({
        ...column,
        isActive: false,
      }));
    }
  }


  onCheckboxChange(column: ColumnsVM) {
    if (column.isActive) { 
      if (!this.checkedColumnsArray.find(col => col.columnsId === column.columnsId)) {
        this.checkedColumnsArray.push(column);
        this.editModeCheckedColumns.push(column); 
        this.displayedColumns.push(column);  
      }
    } else { 
      const index = this.checkedColumnsArray.findIndex(col => col.columnsId === column.columnsId);
      if (index !== -1) {
        this.checkedColumnsArray.splice(index, 1);
      }
      const editModeIndex = this.editModeCheckedColumns.findIndex(col => col.columnsId === column.columnsId);
      if (editModeIndex !== -1) {
        this.editModeCheckedColumns.splice(editModeIndex, 1);
      }
      const displayedColumnIndex = this.displayedColumns.findIndex(col => col.columnsId === column.columnsId);
      if (displayedColumnIndex !== -1) {
        this.displayedColumns.splice(displayedColumnIndex, 1);  
      }
    } 
    this.updateTemplateData();
  }


  updateTemplateData() { 
    if (this.selectedTemplateId && this.checkedColumnsArray.length > 0) {
      const checkedColumnIds = this.checkedColumnsArray.map((column) => column.columnsId);
      const updatedTemplateColumns: TemplateColumnModelVM[] = checkedColumnIds.map((columnId, index) => ({
        columnId: columnId,
        serialNumber: index + 1,
      }));
      this.templateData.templateColumns = updatedTemplateColumns;
      this.templateData.edsTemplateColumns = this.checkedColumnsArray;
    }
  }
  getCheckedColumnsForDragDrop(): TemplateColumnVM[] {
    if (this.isEdit && this.templateData?.edsTemplateColumns?.length > 0) {
      return this.templateData.edsTemplateColumns.filter(column => column.isActive);
    } else {
      return this.checkedColumnsArray.filter(column => column.isActive);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.isEdit) {
      moveItemInArray(this.editModeCheckedColumns, event.previousIndex, event.currentIndex);
      console.log(`Dropped column from index ${event.previousIndex} to index ${event.currentIndex}`);
      this.displayedColumns = JSON.parse(JSON.stringify(this.editModeCheckedColumns));
    } else {
      moveItemInArray(this.checkedColumnsArray, event.previousIndex, event.currentIndex);
      console.log(`Dropped column from index ${event.previousIndex} to index ${event.currentIndex}`);
      this.displayedColumns = JSON.parse(JSON.stringify(this.checkedColumnsArray));
    }
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
      const displayedColumnIndex = this.displayedColumns.findIndex(column => column.columnName === columnName);
      if (displayedColumnIndex !== -1) {
        this.displayedColumns.splice(displayedColumnIndex, 1);
      }
    }
    // Update the templateData to reflect the changes
    this.updateTemplateData();
  }

  deleteColumnInEditMode(columnName: string) {
    const index = this.editModeCheckedColumns.findIndex(column => column.columnName === columnName);
    if (index !== -1) {
      const deletedColumn = this.editModeCheckedColumns.splice(index, 1)[0];
      deletedColumn.isActive = false;
  
      // Find and uncheck the column in selectedCategoryColumns array
      const selectedCategoryColumnIndex = this.selectedCategoryColumns.findIndex(column => column.columnName === columnName);
      if (selectedCategoryColumnIndex !== -1) {
        this.selectedCategoryColumns[selectedCategoryColumnIndex].isActive = false;
      }
  
      // Update the displayedColumns array
      const displayedColumnIndex = this.displayedColumns.findIndex(column => column.columnName === columnName);
      if (displayedColumnIndex !== -1) {
        this.displayedColumns.splice(displayedColumnIndex, 1);
      }
      
      // Update the templateData to reflect the changes
      this.updateTemplateData();
    }
  }
  
  



  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  createUpdateTemplate() {


    if (!this.isEdit) {

      this.templateData.categoryId = this.selectedCategory;

      if (this.checkedColumnsArray.length > 0) { 
        const checkedColumnIds = this.checkedColumnsArray.map(column => column.columnsId); 
        const updatedTemplateColumns: TemplateColumnModelVM[] = checkedColumnIds.map((columnId, index) => ({
          columnId: columnId,
          serialNumber: index + 1,
        })); 
        this.templateData.templateColumns = updatedTemplateColumns;
        this.templateData.edsTemplateColumns = this.checkedColumnsArray;

      }
 
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
    else {
      const updatedTemplateColumns: TemplateColumnModelVM[] = this.editModeCheckedColumns.map((column, index) => ({
        columnId: column.columnsId,
        serialNumber: index + 1,
      }));

      const updatedTemplateData = {
        templateId: this.templateData.templateId,
        templateName: this.templateData.templateName,
        categoryId: this.selectedCategory,
        isActive: this.templateData.isActive,
        templateColumns: updatedTemplateColumns,
      };

      console.log("updatedTemplateData", updatedTemplateData)
      this.templateService.updateDataTemplate(updatedTemplateData).subscribe(
        (response: any) => {
          this.snackBar.open('Template updated successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/dataTemplate']);
        },
        (error: any) => {
          this.snackBar.open('Error updating template: ' + error, 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

}
