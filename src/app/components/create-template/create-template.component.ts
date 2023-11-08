import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTemplateModel } from 'src/app/model/DataTemplateModel';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

interface ColumnNames {
  [key: string]: any; // Define the structure of your columnNames object here.
}
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
  isViewingColumns: boolean = false;
  columns: any[] = [];
  viewColumns: any[] = [];
  isEdit: boolean = false;
  isViewOnly: boolean = false;
  templateId: string = '';
  columnNames: string[] = [];
  selectedcolumnsForUpdate: { [key: number]: boolean } = {};
  selectedColumns: string[] = [];
  checkedColumns: string[] = [];
  sortedColumnNames: string[] = [];
  hasSelectedColumns: boolean = false;
  // template: DataTemplateModel = new DataTemplateModel();
  // columnNames: ColumnNames = {};


  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.templateService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });

    this.route.params.subscribe((params) => {
      this.templateId = params['id'];
      this.isViewOnly = params['isViewOnly'];
      this.viewTemplateColumns();
      if (this.templateId != undefined && this.templateId != "" && this.templateId != null && this.templateId != '') {
        this.isEdit = true;
        this.loadTemplates();
      }
    });
  }

  //  drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.template.columnNames, event.previousIndex, event.currentIndex);
  //   } 
  // }

  // interface ColumnNames {
  //   [key: string]: any; // You can replace 'any' with the actual type of the values in your object if needed.
  // }

  // ...

  drop(event: CdkDragDrop<string[]>) {
    const columnKeys = Object.keys(this.template.columnNames);
    const columnName = columnKeys[event.previousIndex];
  
    // Move the item in the array to reflect the new order
    moveItemInArray(columnKeys, event.previousIndex, event.currentIndex);
  
    // Reconstruct the columnNames object with the updated order
    const updatedColumnNames: { [key: string]: boolean } = {};
    for (const key of columnKeys) {
      const columnValue = this.template.columnNames[key as keyof typeof this.template.columnNames];
      if (typeof columnValue === 'boolean') {
        updatedColumnNames[key] = columnValue;
      }
    }
  
    // Update the template's columnNames with the newly ordered object
    this.template.columnNames = updatedColumnNames as any; // Adjust the type as needed
  
    // You can now use the columnName for your desired logic
    console.log(`Dropped column: ${columnName} from index ${event.previousIndex} to index ${event.currentIndex}`);
  }
  



  checkSelectedColumns() {
    console.log('clicked on check selected cols')
    // Check if there are any selected columns
    this.hasSelectedColumns = Object.values(this.template.columnNames).some(value => value);
  }



  fetchColumnsByCategory(categoryId: number) {
    this.templateService.getColumnsByCategory(categoryId).subscribe((columns: string[]) => {
      this.columns = columns;
      this.initializeSelectedColumnsForUpdate();
    });
  }

  initializeSelectedColumnsForUpdate() {
    this.selectedcolumnsForUpdate = {};
    for (let column of this.columns) {
      this.selectedcolumnsForUpdate[column.columnID] = this.viewColumns.includes(column.columnName);
    }
  }

  loadTemplates() {
    this.templateService.getTemplate(this.templateId).subscribe((template: any) => {
      this.template = template;
      this.fetchColumnsByCategory(this.template.categoryID);
    });
  }

  viewTemplateColumns() {
    this.templateService.getColumnsOfTemplate(this.templateId).subscribe((viewColumns: string[]) => {
      this.viewColumns = viewColumns;
      this.isViewingColumns = true;
    });

  }

  updateFilteredColumns() {
    this.sortedColumnNames = Object.keys(this.template.columnNames);
  }

  updateSortedColumnNames() {
    this.sortedColumnNames = this.columns.filter((column) =>
      this.checkedColumns.includes(column.columnName)
    );
  }


  isChecked(columnName: string): boolean {
    return this.checkedColumns.includes(columnName);
  }

  updateColumns(categoryId: number) {
    this.columns = [];
    this.template.categoryID = categoryId;
    this.fetchColumnsByCategory(categoryId);
  }

  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  createUpdateTemplate() {
    if (!this.isEdit) {
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

      this.template.columnsId = selectedColumnIds;
      this.templateService.createDataTemplate(this.template).subscribe(() => {
        this.snackBar.open('Template created successfully', 'Close', {
          duration: 3000,
        });

        this.router.navigate(['/dataTemplate']);
      });
    } else {
      const selectedColumnIds = Object.keys(this.selectedcolumnsForUpdate)
        .filter((key) => this.selectedcolumnsForUpdate[parseInt(key)])
        .map((key) => parseInt(key));


      if (!selectedColumnIds || selectedColumnIds.length === 0) {
        this.snackBar.open('Please select at least one column to update.', 'Close', {
          duration: 3000,
        });
        return;
      }
      this.template.columnsId = selectedColumnIds;
      this.templateService.updateDataTemplate(this.templateId, this.template).subscribe(
        (response: any) => {
          this.snackBar.open('Template updated successfully', 'Close', {
            duration: 2000,
          });

          this.router.navigate(['/dataTemplate']);
        },
        (error: any) => {
          this.snackBar.open('Error updating template' + error.error, 'Close', {
            duration: 8000,
          });
        }
      );
    }
  }

  deleteColumn(columnName: string) {
    // Loop through the keys (column names) of the object
    for (const key in this.template.columnNames) {
      if (this.template.columnNames.hasOwnProperty(key)) {
        if (key === columnName) {
          // Remove the column by deleting the key from the object
          delete this.template.columnNames[key];
          break; // Exit the loop after deleting the column
        }
      }
    }
  } 
}
