import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryCode: string = '';
  currentDatetime = new Date();

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

  CreateCategory() {
    if (!this.categoryName || !this.categoryCode) {
      this.snackBar.open('Category Name and Code are required.', 'Close', {
        duration: 3000,
      });
      return; // Prevent further execution if fields are empty
    }
  
    const templateData = {
      templateName: '', // Add the properties you need for a template
    };
  
    const categoryData = {
      categoryName: this.categoryName,
      code: this.categoryCode,
      createdBy: 'ABC',
      createdAt: this.currentDatetime.toISOString(),
      templates: [templateData], // Include the empty template
    };
  
    console.log(categoryData);
  
    this.categoryService.createCategory(categoryData).subscribe(
      (response) => {
        console.log('Category created successfully:', response);
        this.snackBar.open('Category created successfully', 'Close', {
          duration: 3000,
        });
        // Redirect to the category list screen
        this.goToCategoryScreen();
      },
      (error) => {
        console.error('Error creating category:', error);
        // Handle error and show an error message
        this.snackBar.open('Error creating category', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
}
