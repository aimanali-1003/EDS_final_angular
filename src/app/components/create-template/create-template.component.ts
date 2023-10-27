import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTemplateModel } from 'src/app/model/DataTemplateModel';
import { FormGroup } from '@angular/forms';

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

  constructor( 
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

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

  updateColumns(categoryId: number) {
    this.columns = [];
    this.template.categoryID = categoryId;
    this.fetchColumnsByCategory(categoryId);
  }

  updateFilteredColumns() {
    const searchText = this.columnSearch.toLowerCase();
    this.filteredColumns = this.columns.filter((column: any) => column.toLowerCase().includes(searchText));
  }

  goToTemplateScreen() {
    this.router.navigate(['/dataTemplate']);
  }

  createTemplate() {
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
}
