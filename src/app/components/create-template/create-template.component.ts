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

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  currentPage: number = 1; // Track current page
  totalCategories = 0;
  pageSize: number = 10;
  categories: CategorySM[] = [];

  templates: TemplateVM[] = [];
  templateData: CreateTemplateVM = new CreateTemplateVM()

  isEdit: boolean = false;
  isViewOnly: boolean = false;

  selectedCategoryColumns: ColumnsVM[] = [];
  selectedCategory: CategorySM[] = [];

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

  onCategorySelect(category: CategorySM): void {
    this.selectedCategoryColumns = category.edsColumns ? 
      category.edsColumns.map(column => ({ ...column, isActive: false })) : [];
  }

  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  // updateSerialNumbers(): void {
  //   let order = 1;
  //   this.templateData.edsTemplateColumns.forEach((column) => {
  //     if (column.columnID) {
  //       column.columnID = column.columnID || 0;
  //       column.serial_Number = order;
  //       order++;
  //     }
  //   });
  // }

createUpdateTemplate(){
  

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
// createUpdateTemplate(): void {
//   if (this.templateData.category?.categoryId) {
//     this.templateData.categoryId = this.templateData.category?.categoryId;
//   }

//   // Transform data to match backend structure
//   const formattedTemplateData: CreateTemplateVM = {
//     templateId: this.templateData.templateId,
//     templateName: this.templateData.templateName,
//     categoryId: this.templateData.categoryId,
//     isActive: this.templateData.isActive,
//     templateColumns: this.templateData.edsTemplateColumns.map((column) => {
//       const templateColumn: TemplateColumnModelVM = {
//         columnId: column.columnID,
//         serialNumber: column.serial_Number
//       };
//       return templateColumn;
//     })
//   };

//   // Call the service using the formatted data
//   this.templateService.createDataTemplate(this.templateData).subscribe(
//     (response: any) => {
//       this.snackBar.open('Template created successfully', 'Close', {
//         duration: 2000,
//       });
//       this.router.navigate(['/templates']);
//     },
//     (error: any) => {
//       this.snackBar.open('Error creating template: ' + error, 'Close', {
//         duration: 3000,
//       });
//     }
//   );
// }

}
