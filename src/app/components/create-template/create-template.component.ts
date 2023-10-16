import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  template: { templateName: string, categoryId: number, category: string,columns: { [key: string]: boolean } } = {
    templateName: '',
    categoryId: 0, // Store the selected category ID
    category: '',
    columns: {}
  };
  columnSearch: string = '';
  filteredColumns: string[] = [];
  categoryName: string = '';
  categoriesWithColumns: any[] = [];

  categories: any[] = [];
  columns: any[] = [];

  constructor(
    private templateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(): void {
    this.templateService.getCategories().subscribe((categories: any[]) => {
      console.log(categories);
      this.categories = categories;
    });
  }
  

  // Update the selected category ID
  updateCategory(categoryId: number) {
    this.template.categoryId = categoryId;

    // Fetch columns for the selected category
    // this.templateService.getColumnsByCategory(this.template.categoryId).subscribe((columns: string[]) => {
    //   console.log(columns);
    //   this.columns = columns;
    // });
  }

  updateFilteredColumns() {
    const searchText = this.columnSearch.toLowerCase();
    this.filteredColumns = this.columns.filter(column => column.toLowerCase().includes(searchText));
  }

  goToTemplateScreen() {
    this.router.navigate(['/templates']);
  }
  

  createTemplate() {
    const selectedColumnsArray = Object.keys(this.template.columns).filter(column => this.template.columns[column]);

    if (!this.template.templateName || this.template.categoryId === 0 || selectedColumnsArray.length === 0) {
      this.snackBar.open('Template Name, Category, and Columns are required.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const templateConfig = {
      templateName: this.template.templateName,
      categoryId: this.template.categoryId,
      columns: selectedColumnsArray,
      categoryName: this.categoryName
    };

    this.templateService.createDataTemplate(templateConfig).subscribe(() => {
      this.snackBar.open('Template created successfully', 'Close', {
        duration: 3000,
      });

      this.router.navigate(['/templates']);
    });
  }
}
