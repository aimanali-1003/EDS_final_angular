import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTemplateModel, TemplateVM } from 'src/app/model/DataTemplateModel';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActiveJobsPopupComponent } from '../active-jobs-popup/active-jobs-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  templateData!: TemplateVM;
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
  templateId!: number;
  columnNames: string[] = [];
  selectedcolumnsForUpdate: { [key: number]: boolean } = {};
  selectedColumns: string[] = [];
  checkedColumns: string[] = [];
  sortedColumnNames: string[] = [];
  hasSelectedColumns: boolean = false;
  testing: string[] = [];
  showColumnsOrder: boolean = false;



  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.templateService.getCategories().subscribe((categories: any[]) => {
    //   this.categories = categories;
    // });

    this.route.params.subscribe((params) => {
      this.templateId = +params['id'];
      this.isViewOnly = params['isViewOnly'];
      if (this.templateId) {
        this.templateService.getTemplate(this.templateId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.templateData = response.data;
              this.categories = [{ categoryId: this.templateData.categoryId, categoryName: this.templateData.category?.categoryName }];
              // Handle the retrieved client data here
            } else {
              console.error('No template found or unsuccessful response.');
              // Handle error cases or no client found
            }
          },
          (error) => {
            console.error('Error fetching template:', error);
            // Handle error cases
          }
        );
      }
      // this.viewTemplateColumns();
      // if (this.templateId != undefined && this.templateId != "" && this.templateId != null && this.templateId != '') {
      //   this.isEdit = true;
      //   // this.loadTemplates();
      // }
    });
  }

  onColumnSelectionChange(column: any): void {
    // Handle the column selection change logic here
    console.log('Selected Column:', column);
    // You can add logic to manage selected columns, e.g., add them to an array or perform other actions
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.testing, event.previousIndex, event.currentIndex);
    console.log(`Dropped column from index ${event.previousIndex} to index ${event.currentIndex}`);
    this.updateColumnOrder();
  }
  updateColumnOrder() {
    const updatedColumnOrder = this.testing.map((columnName) => {
      const column = this.columns.find((c) => c.columnName === columnName);
      return { columnId: column.columnID, columnName: column.columnName };
    });
    console.log('Updated Column Order:', updatedColumnOrder);
  }


  // checkSelectedColumns() {
  //   console.log('clicked on check selected cols')
  //   this.hasSelectedColumns = Object.values(this.template.columnNames).some(value => value);
  // }

  fetchColumnsByCategory(categoryId: number) {
    this.testing = [];
    this.templateService.getColumnsByCategory(categoryId).subscribe((columns: string[]) => {
      this.columns = columns;
      this.initializeSelectedColumnsForUpdate();
    });
  }

  initializeSelectedColumnsForUpdate() {
    this.selectedcolumnsForUpdate = {};
    this.testing = this.viewColumns.slice();

    for (let column of this.columns) {
      const isSelected = this.viewColumns.includes(column.columnName);
      this.selectedcolumnsForUpdate[column.columnID] = isSelected;
    }
  }

  // loadTemplates() {
  //   this.templateService.getTemplate(this.templateId).subscribe((template: any) => {
  //     this.template = template;
  //     console.log(this.template)
  //     this.fetchColumnsByCategory(this.template.categoryID);
  //   });
  // }

  // viewTemplateColumns() {
  //   this.templateService.getColumnsOfTemplate(this.templateId).subscribe((viewColumns: string[]) => {
  //     this.viewColumns = viewColumns;
  //     this.testing = this.viewColumns;
  //     this.isViewingColumns = true;
  //   });
  // }

  // updateFilteredColumns() {
  //   this.sortedColumnNames = Object.keys(this.template.columnNames);
  // }

  // updateSortedColumnNames() {
  //   this.sortedColumnNames = this.columns.filter((column) =>
  //     this.checkedColumns.includes(column.columnName)
  //   );
  // }

  // isChecked(columnName: string): boolean {
  //   if (!this.isEdit) {
  //     const isChecked = this.template.columnNames[columnName as keyof typeof this.template.columnNames];

  //     if (isChecked) {
  //       if (!this.testing.includes(columnName)) {
  //         this.testing = [...this.testing, columnName];
  //       }
  //     } else {
  //       this.testing = this.testing.filter((col) => col !== columnName);
  //     }

  //     return !!isChecked;
  //   } else {
  //     const isSelectedForUpdate = this.selectedcolumnsForUpdate[columnName as any];
  //     if (isSelectedForUpdate) {
  //       if (!this.testing.includes(columnName)) {
  //         this.testing = [...this.testing, columnName];
  //       }
  //     } else {
  //       this.testing = this.testing.filter((col) => col !== columnName);
  //     }

  //     return !!isSelectedForUpdate;
  //   }
  // }

  // updateColumns(categoryId: number) {
  //   this.columns = [];
  //   this.template.categoryID = categoryId;
  //   this.fetchColumnsByCategory(categoryId);
  //   this.initializeSelectedColumnsForUpdate();
  // }


  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  // createUpdateTemplate() {
  //   if (!this.isEdit) {

  //     const updatedColumnIds = this.testing.map((columnName) => {
  //       const column = this.columns.find((c) => c.columnName === columnName);
  //       return column.columnID;
  //     });

  //     if (!this.template.templateName || this.template.categoryID === 0 || updatedColumnIds.length === 0) {
  //       this.snackBar.open('Template Name, Category, and Columns are required.', 'Close', {
  //         duration: 3000,
  //       });
  //       return;
  //     }

  //     this.template.columnsId = updatedColumnIds;
  //     this.updateColumnOrder();
  //     this.templateService.createDataTemplate(this.template).subscribe(() => {
  //       this.snackBar.open('Template created successfully', 'Close', {
  //         duration: 3000,
  //       });

  //       this.router.navigate(['/dataTemplate']);
  //     });
  //   } else {
  //     const selectedColumnIds = Object.keys(this.selectedcolumnsForUpdate)
  //       .filter((key) => this.selectedcolumnsForUpdate[parseInt(key)])
  //       .map((key) => parseInt(key));

  //     const updatedColumnIds = this.testing.map((columnName) => {
  //       const column = this.columns.find((c) => c.columnName === columnName);
  //       return column.columnID;
  //     });
  //     if (selectedColumnIds.length === 0) {
  //       this.snackBar.open('Please select at least one column to update.', 'Close', {
  //         duration: 3000,
  //       });
  //       return;
  //     }
  //     this.template.columnsId = updatedColumnIds;
  //     this.templateService.updateDataTemplate(this.templateId, this.template).subscribe(
  //       (response: any) => {
  //         if (response.activeJobs) {
  //           console.log(response.activeJobs)
  //           const dialogRef = this.dialog.open(ActiveJobsPopupComponent, {
  //             data: { activeJobs: response.activeJobs }
  //           });
      
  //           dialogRef.afterClosed().subscribe(result => {
  //             console.log('The dialog was closed');
  //           });
  //         } else {
  //           this.snackBar.open('Template updated successfully', 'Close', {
  //             duration: 2000,
  //           });
      
  //           this.router.navigate(['/dataTemplate']);
  //         }
  //       },
  //       (error: any) => {
  //         this.snackBar.open('Error updating template: ' + error.error, 'Close', {
  //           duration: 8000,
  //         });
  //       }
  //     );

  //   }
  // }

  // deleteColumn(columnName: string) {
  //   const index = this.testing.indexOf(columnName);
  //   if (index !== -1) {
  //     this.testing.splice(index, 1);
  //     if (this.isEdit) {
  //       const column = this.columns.find((c) => c.columnName === columnName);
  //       if (column) {
  //         delete this.selectedcolumnsForUpdate[column.columnID];
  //       }
  //     } else {
  //       const column = this.columns.find((c) => c.columnName === columnName);
  //       if (column) {
  //         delete this.template.columnNames[column.columnName];
  //       }
  //     }
  //   }
  // }

}